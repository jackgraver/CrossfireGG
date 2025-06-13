import datetime
import json
from pathlib import Path
from dotenv import load_dotenv
import os
from fastapi import FastAPI
import requests

from db import *

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}


@app.get("/matches")
def get_matches():
    conn = get_db_connection()
    try:
        matches = fetch_all_matches(conn)
    finally:
        conn.close()
    return matches

@app.get("/teams")
def get_matches():
    conn = get_db_connection()
    try:
        teams = fetch_all_teams(conn)
    finally:
        conn.close()
    return teams

@app.get("/last_update")
def get_last_update():
    conn = get_db_connection()
    try:
        last_update = query_last_update(conn)
    finally:
        conn.close()
    return last_update

@app.get("/refresh")
def refresh_teams():
    conn = get_db_connection()
    process_matches()
    try:
        write_metadata(conn, "last_refresh", int(datetime.datetime.now().timestamp()))
    finally:
        conn.close()
    return {"teams:": [], "matches": []}


FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
FACEIT_API_URL = "https://open.faceit.com/data/v4/championships/f56331e8-131a-4c50-b7db-eec8b010ff98/matches?limit=70"
MATCHES_FILE = Path("matches.json")
DEBUG = False 
def process_matches():
    try:
        if DEBUG:
            with open("f.json", "r", encoding="utf-8") as f:
                items = json.load(f).get("items", [])  # expects a list of matches
        else:
            response = requests.get(
                FACEIT_API_URL,
                headers={
                    "Authorization": f"Bearer {FACEIT_API_KEY}",
                    "Accept": "application/json",
                },
            )
            response.raise_for_status()
            items = response.json().get("items", [])
            
        conn = get_db_connection()
        
        # print('b', items[0]['scheduled_at'])
        # items.sort(key=lambda item: item.get("scheduled_at", 0), reverse=True)
        # print('a', items[0]['scheduled_at'])
        
        with Path("f.json").open("w", encoding="utf-8") as f:
            json.dump(items, f, indent=2)
        
        for item in reversed(items):
            teams = item.get("teams", {})
            results = item.get("results", {})
            faction1 = teams.get("faction1", {})
            faction2 = teams.get("faction2", {})
            winner_key = results.get("winner")  # "faction1" or "faction2"

            team1 = {"team_id": faction1.get("faction_id"), "name": faction1.get("name")}
            team2 = {"team_id": faction2.get("faction_id"), "name": faction2.get("name")}
            
            if not winner_key:
                match = {
                    "match_id": item.get("match_id"),
                    "status": item.get("status"),
                    "round": get_team_record(conn, team1["team_id"]),
                    "faceit_url": item.get("faceit_url").replace('{lang}', 'en'),
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
                "match_id": item.get("match_id"),
                "status": item.get("status"),
                "round": get_team_record(conn, team1["team_id"]),
                "faceit_url": item.get("faceit_url").replace('{lang}', 'en'),
                "team1_id": team1["team_id"],
                "team2_id": team2["team_id"],
                "winner": winner_id
            }            
            write_match(match)
            
            update_team_record(conn, team1, won=(team1["team_id"] == winner_id))
            update_team_record(conn, team2, won=(team2["team_id"] == winner_id))
            
        conn.close()
        return items

    except (requests.RequestException, json.JSONDecodeError, FileNotFoundError) as err:
        print("Fetch error:", err)
        return []

    

# def process_matches():
#     try:
#         response = requests.get(
#             FACEIT_API_URL,
#             headers={
#                 "Authorization": f"Bearer {KEY}",
#                 "Accept": "application/json",
#             },
#         )
#         response.raise_for_status()
#         items = response.json().get("items", [])

#         # Write the data to a JSON file
#         with MATCHES_FILE.open("w", encoding="utf-8") as f:
#             json.dump(items, f, indent=2)

#         return items
#     except requests.RequestException as err:
#         print("Fetch error:", err)
#         return []