from dotenv import load_dotenv
import os
from pathlib import Path
import json
import requests

from db.db import get_db_connection
from db.match.match_sql import fetch_all_matches, write_match
from db.team.team_sql import get_team_record, update_team_record

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")
# FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/f56331e8-131a-4c50-b7db-eec8b010ff98/matches?limit=70"
FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/b4cb8915-2a74-4899-b7df-220cb85f3916/matches?limit=70"
MATCHES_FILE = Path("test_data/f2.json")
DEBUG = False 
def process_matches():
    try:
        if DEBUG:
            with open(MATCHES_FILE, "r", encoding="utf-8") as f:
                matches = json.load(f).get("items", [])  # expects a list of matches
        else:
            response = requests.get(
                FACEIT_API_URL,
                headers={
                    "Authorization": f"Bearer {FACEIT_API_KEY}",
                    "Accept": "application/json",
                },
            )
            response.raise_for_status()
            matches = response.json().get("items", [])
            
        conn = get_db_connection()
        
        # print('b', items[0]['scheduled_at'])
        # items.sort(key=lambda item: item.get("scheduled_at", 0), reverse=True)
        # print('a', items[0]['scheduled_at'])
        
        # with Path("f2.json").open("w", encoding="utf-8") as f:
        #     json.dump(items, f, indent=2)
        
        processed_matches = {match["match_id"] for match in fetch_all_matches(conn)}
        nonprocess_matches = [match for match in matches if match["match_id"] not in processed_matches]   #fetch_all_matches(conn)
        
        for match in reversed(nonprocess_matches): 
            teams = match.get("teams", {})
            results = match.get("results", {})
            faction1 = teams.get("faction1", {})
            faction2 = teams.get("faction2", {})
            winner_key = results.get("winner")  # "faction1" or "faction2"

            team1 = {"team_id": faction1.get("faction_id"), "name": faction1.get("name"), "team_logo": faction1.get("avatar")}
            team2 = {"team_id": faction2.get("faction_id"), "name": faction2.get("name"), "team_logo": faction2.get("avatar")}
            
            if not winner_key:
                match = {
                    "match_id": match.get("match_id"),
                    "status": match.get("status"),
                    "round": get_team_record(conn, team1["team_id"]),
                    "faceit_url": match.get("faceit_url").replace('{lang}', 'en'),
                    "team1_id": team1["team_id"],
                    "team2_id": team2["team_id"],
                    "winner": ""
                }    
                write_match(match)

            if winner_key not in ("faction1", "faction2"):
                print("Invalid or missing winner key:", winner_key)
                continue

            winner_id = teams.get(winner_key, {}).get("faction_id")

            if not all([team1, team2, winner_id]):
                print("Missing faction IDs or winner ID")
                continue  # skip incomplete data
            
            match = {
                "match_id": match.get("match_id"),
                "status": match.get("status"),
                "round": get_team_record(conn, team1["team_id"]),
                "faceit_url": match.get("faceit_url").replace('{lang}', 'en'),
                "team1_id": team1["team_id"],
                "team2_id": team2["team_id"],
                "winner": winner_id
            }            
            write_match(match)
            
            update_team_record(conn, team1, won=(team1["team_id"] == winner_id))
            update_team_record(conn, team2, won=(team2["team_id"] == winner_id))
            
        conn.close()
        return matches

    except (requests.RequestException, json.JSONDecodeError, FileNotFoundError) as err:
        print("Fetch error:", err)
        return []