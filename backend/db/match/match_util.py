from uuid import uuid4
from dotenv import load_dotenv
import os
from pathlib import Path
import json
import requests

from db.db import get_db_connection
from db.match.match_sql import fetch_all_matches, write_match
from db.team.team_sql import get_team_record, update_team_record
from db.tournament.tournament_sql import get_current_sub_tournament_id
from db.metadata.metadata_sql import get_metadata_value

load_dotenv()

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")
FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/f56331e8-131a-4c50-b7db-eec8b010ff98/matches?limit=70"
# FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/b4cb8915-2a74-4899-b7df-220cb85f3916/matches?limit=70"
MATCHES_FILE = Path("test_data/f2.json")
DEBUG = False 

def process_matches():
    try:
        current_sub_t_id = get_current_sub_tournament_id()
        current_stage = get_metadata_value("current_stage")
        if not current_sub_t_id:
            print("Could not determine current sub_tournament ID from metadata")
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
            
        all_matches = fetch_all_matches()
        processed_matches = {match["match_id"] for group in all_matches.values() for match in group}
        nonprocess_matches = [match for match in matches if match["match_id"] not in processed_matches] 
        
        for match in reversed(nonprocess_matches): 
            teams = match.get("teams", {})
            results = match.get("results", {})
            faction1 = teams.get("faction1", {})
            faction2 = teams.get("faction2", {})
            winner_key = results.get("winner")

            team1 = {"team_id_i": str(uuid4()), "team_id": faction1.get("faction_id"), "name": faction1.get("name"), "team_logo": faction1.get("avatar"), "sub_t_id": current_sub_t_id}
            team2 = {"team_id_i": str(uuid4()), "team_id": faction2.get("faction_id"), "name": faction2.get("name"), "team_logo": faction2.get("avatar"), "sub_t_id": current_sub_t_id}
            
            if not winner_key:
                match = {
                    "match_id": match.get("match_id"),
                    "sub_t_id": current_sub_t_id,
                    "status": match.get("status"),
                    "scheduled_at": match.get("scheduled_at"),
                    "round": get_team_record(team1["team_id"], current_sub_t_id, current_stage),
                    "faceit_url": match.get("faceit_url").replace('{lang}', 'en'),
                    "team1_id": team1["team_id"],
                    "team2_id": team2["team_id"],
                    "winner": "",
                    "team1_score": results.get("score", {}).get("faction1", 0),
                    "team2_score": results.get("score", {}).get("faction2", 0)
                }    
                write_match(match)

            if winner_key not in ("faction1", "faction2"):
                print("Invalid or missing winner key:", winner_key)
                continue

            winner_id = teams.get(winner_key, {}).get("faction_id")

            if not all([team1, team2, winner_id]):
                print("Missing faction IDs or winner ID")
                continue 
            
            match = {
                "match_id": match.get("match_id"),
                "status": match.get("status"),
                "sub_t_id": current_sub_t_id,
                "scheduled_at": match.get("scheduled_at"),
                "round": get_team_record(team1["team_id"], current_sub_t_id, current_stage),
                "faceit_url": match.get("faceit_url").replace('{lang}', 'en'),
                "team1_id": team1["team_id"],
                "team2_id": team2["team_id"],
                "winner": winner_id,
                "team1_score": results.get("score", {}).get("faction1", 0),
                "team2_score": results.get("score", {}).get("faction2", 0)
            }               
            write_match(match)
            
            update_team_record(team1, won=(team1["team_id"] == winner_id), current_sub_t_id=current_sub_t_id)
            update_team_record(team2, won=(team2["team_id"] == winner_id), current_sub_t_id=current_sub_t_id)
            
        return matches

    except (requests.RequestException, json.JSONDecodeError, FileNotFoundError) as err:
        print("Fetch error:", err)
        return []