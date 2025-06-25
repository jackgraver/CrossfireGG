from uuid import uuid4
from dotenv import load_dotenv
import os
from pathlib import Path
import json
import requests

from db.db import get_db_connection
from db.match.match_sql import fetch_all_matches, write_match, write_map
from db.team.team_sql import get_team_record, update_team_record
from db.tournament.tournament_sql import get_current_sub_tournament_id
from db.metadata.metadata_sql import get_metadata_value
from db.player.player_model import Player, PlayerStats
from db.player.player_sql import insert_player, insert_player_stats

load_dotenv()

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")
FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/f56331e8-131a-4c50-b7db-eec8b010ff98/matches?limit=70"
# FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/b4cb8915-2a74-4899-b7df-220cb85f3916/matches?limit=70"
MATCHES_FILE = Path("test_data/flush_matches.json")
DEBUG = True 

def process_matches():
    try:
        current_sub_t_id = get_current_sub_tournament_id()
        current_stage = get_metadata_value("current_stage")
        if not current_sub_t_id:
            return []
        
        if DEBUG:
            with open(MATCHES_FILE, "r", encoding="utf-8") as f:
                matches = json.load(f).get("items", [])  # expects a list of matches
        else:
            response = requests.get(
                f'https://open.faceit.com/data/v4/championships/{current_sub_t_id}/matches?limit=70',
                headers={
                    "Authorization": f"Bearer {FACEIT_API_KEY}",
                    "Accept": "application/json",
                },
            )
            response.raise_for_status()
            matches = response.json().get("items", [])
            matches_file = Path("test_data/flush_matches.json")
            with open(matches_file, "w", encoding="utf-8") as f:
                json.dump(matches, f, indent=4, default=str)
            
        all_matches = fetch_all_matches()
        processed_matches = {match["match_id"] for group in all_matches.values() for match in group}
        nonprocess_matches = [match for match in matches if match["match_id"] not in processed_matches] 
        
        for proc_match in reversed(nonprocess_matches): 
            teams = proc_match.get("teams", {})
            results = proc_match.get("results", {})
            faction1 = teams.get("faction1", {})
            faction2 = teams.get("faction2", {})
            winner_key = results.get("winner")
            
            # process_players(faction1.get("roster", []), faction1.get("faction_id"), current_sub_t_id)
            # process_players(faction2.get("roster", []), faction2.get("faction_id"), current_sub_t_id)

            team1 = {"team_id_i": str(uuid4()), "team_id": faction1.get("faction_id"), "name": faction1.get("name"), "team_logo": faction1.get("avatar"), "sub_t_id": current_sub_t_id}
            team2 = {"team_id_i": str(uuid4()), "team_id": faction2.get("faction_id"), "name": faction2.get("name"), "team_logo": faction2.get("avatar"), "sub_t_id": current_sub_t_id}
            
            if not winner_key:
                match = {
                    "match_id": proc_match.get("match_id"),
                    "sub_t_id": current_sub_t_id,
                    "status": proc_match.get("status"),
                    "scheduled_at": proc_match.get("scheduled_at"),
                    "round": get_team_record(team1["team_id"], current_sub_t_id, current_stage),
                    "faceit_url": proc_match.get("faceit_url").replace('{lang}', 'en'),
                    "team1_id": team1["team_id"],
                    "team2_id": team2["team_id"],
                    "winner": "",
                    "team1_score": results.get("score", {}).get("faction1", 0),
                    "team2_score": results.get("score", {}).get("faction2", 0)
                }    
                write_match(match)

            if winner_key not in ("faction1", "faction2"):
                continue

            winner_id = teams.get(winner_key, {}).get("faction_id")

            if not all([team1, team2, winner_id]):
                continue 
            
            match = {
                "match_id": proc_match.get("match_id"),
                "status": proc_match.get("status"),
                "sub_t_id": current_sub_t_id,
                "scheduled_at": proc_match.get("scheduled_at"),
                "round": get_team_record(team1["team_id"], current_sub_t_id, current_stage),
                "faceit_url": proc_match.get("faceit_url").replace('{lang}', 'en'),
                "team1_id": team1["team_id"],
                "team2_id": team2["team_id"],
                "winner": winner_id,
                "team1_score": results.get("score", {}).get("faction1", 0),
                "team2_score": results.get("score", {}).get("faction2", 0)
            }               
            write_match(match)
            
            update_team_record(team1, won=(team1["team_id"] == winner_id), current_sub_t_id=current_sub_t_id)
            update_team_record(team2, won=(team2["team_id"] == winner_id), current_sub_t_id=current_sub_t_id)
            
            process_stats(match.get("match_id"), current_sub_t_id)
            
        return matches

    except (requests.RequestException, json.JSONDecodeError, FileNotFoundError) as err:
        print("Fetch error:", err)
        return []
    

def process_players(players_data: list, team_id: str, sub_t_id: str = None):
    """
    Process a list of players and insert them into the database.
    
    Args:
        players_data: List of player dictionaries containing player information
        team_id: The team ID that these players belong to
        sub_t_id: Optional sub tournament ID (will use current if not provided)
    """
    try:
        # Use current sub tournament ID if not provided
        if not sub_t_id:
            sub_t_id = get_current_sub_tournament_id()
            if not sub_t_id:
                return []
        
        inserted_players = []
        
        for player_data in players_data:
            # Extract player information from the data
            player_id = player_data.get("player_id")
            player_name = player_data.get("name", player_data.get("nickname", "Unknown"))
            player_logo = player_data.get("avatar", player_data.get("player_logo"))
            
            if not player_id:
                continue
            
            # Create Player object
            player = Player(
                player_id_i=str(uuid4()),
                player_id=player_id,
                team_id=team_id,
                sub_t_id=sub_t_id,
                player_name=player_name,
                player_logo=player_logo
            )
            
            try:
                # Insert player into database
                inserted_player = insert_player(player)
                inserted_players.append(inserted_player)
            except Exception as e:
                print(f"Failed to insert player {player_name} (ID: {player_id}): {e}")
                continue
        
    except Exception as e:
        print(f"Error processing players: {e}")
    

STATS_FILE = Path("test_data/flush_stats.json")
STATS_DEBUG = True 

# @TODO: Implement sub_t_id
def process_stats(match_id: str, sub_t_id: str = None):
    """
    Process match statistics and insert player stats into the database.
    
    Args:
        match_id: The match ID to fetch stats for
        sub_t_id: Optional sub tournament ID (will use current if not provided)
    """
    try:
        # Use current sub tournament ID if not provided
        if not sub_t_id:
            sub_t_id = get_current_sub_tournament_id()
            if not sub_t_id:
                return []
        
        # Fetch stats data based on DEBUG setting
        if STATS_DEBUG:
            try:
                with open(f"test_data/stats/{match_id}_stats.json", "r", encoding="utf-8") as f:
                    stats_data = json.load(f)
            except FileNotFoundError:
                print(f"Stats file {f"test_data/stats/{match_id}_stats.json"} not found, falling back to API")
                return
        
        if not STATS_DEBUG:
            # Fetch from API
            api_url = f"https://open.faceit.com/data/v4/matches/{match_id}/stats"
            response = requests.get(
                api_url,
                headers={
                    "Authorization": f"Bearer {FACEIT_API_KEY}",
                    "Accept": "application/json",
                },
            )
            response.raise_for_status()
            stats_data = response.json()
            stats_file = Path(f"test_data/stats/{match_id}_stats.json")
            with open(stats_file, "w", encoding="utf-8") as f:
                json.dump(stats_data, f, indent=4, default=str) 
            
        inserted_stats = []
        inserted_maps = []
        
        print("rounds length: ", len(stats_data.get("rounds", [])))
        # Process each round in the match
        for round_data in stats_data.get("rounds", []):
            if round_data.get("match_id") != match_id:
                continue
            print("round_data: ", round_data.get("round_stats", {}).get("Map"))
            
            match_round = round_data.get("match_round")
            round_stats = round_data.get("round_stats", {})
            
            # Create Map entry for this round
            map_name = round_stats.get("Map", "Unknown")
            winner_id = round_stats.get("Winner", "")
            score_parts = round_stats.get("Score", "0 / 0").split(" / ")
            team1_score = int(score_parts[0]) if len(score_parts) > 0 else 0
            team2_score = int(score_parts[1]) if len(score_parts) > 1 else 0
            
            map_id = str(uuid4())
            map_entry = {
                "map_id": map_id,
                "match_id": match_id,
                "map_name": map_name,
                "round": int(match_round),
                "winner_id": winner_id,
                "team1_score": team1_score,
                "team2_score": team2_score
            }
            
            try:
                # Insert map into database
                write_map(map_entry)
                inserted_maps.append(map_entry)
            except Exception as e:
                print(f"Failed to insert map for round {match_round}: {e}")
                continue
            
            # Process each team in the round
            for team_data in round_data.get("teams", []):
                team_id = team_data.get("team_id")
                
                # Process each player in the team
                for player_data in team_data.get("players", []):
                    player_id = player_data.get("player_id")
                    player_stats_data = player_data.get("player_stats", {})
                    
                    if not player_id:
                        continue
                    
                    # Extract key statistics
                    kills = int(player_stats_data.get("Kills", 0))
                    deaths = int(player_stats_data.get("Deaths", 0))
                    assists = int(player_stats_data.get("Assists", 0))
                    adr = int(float(player_stats_data.get("ADR", 0)))
                    damage = int(player_stats_data.get("Damage", 0))
                    
                    # Create PlayerStats object
                    player_stats = PlayerStats(
                        ps_id=str(uuid4()),
                        player_id=player_id,
                        match_id=match_id,
                        map_id=map_id,
                        kills=kills,
                        deaths=deaths,
                        assists=assists,
                        adr=adr,
                        damage=damage
                    )
                    
                    try:
                        # Insert player stats into database
                        inserted_stat = insert_player_stats(player_stats)
                        inserted_stats.append(inserted_stat)
                    except Exception as e:
                        print(f"Failed to insert stats for player {player_id} in round {match_round}: {e}")
                        continue
        
    except Exception as e:
        print(f"Error processing stats: {e}")