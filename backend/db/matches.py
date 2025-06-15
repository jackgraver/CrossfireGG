import sqlite3
from typing import List, Dict

from db.teams import get_team_info

def create_matches_table(conn: sqlite3.Connection):
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS matches (
            match_id TEXT PRIMARY KEY,
            status TEXT,
            round TEXT,
            faceit_url TEXT,
            team1_id TEXT,
            team2_id TEXT,
            winner TEXT
        )
    """)
    conn.commit()


def fetch_all_matches(conn: sqlite3.Connection) -> List[Dict]:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM matches")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()

    matches = []
    for row in rows:
        match = dict(zip(columns, row))

        team1_id = match.pop("team1_id", None)
        team2_id = match.pop("team2_id", None)

        team1 = get_team_info(conn, team1_id)
        team2 = get_team_info(conn, team2_id)

        match["teams"] = {
            "team1": team1,
            "team2": team2
        }

        matches.append(match)

    return matches

def write_match(match: dict):
    conn = sqlite3.connect("oss.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR IGNORE INTO matches (match_id, status, round, faceit_url, team1_id, team2_id, winner) VALUES (?, ?, ?, ?, ?, ?, ?);",
        (match["match_id"], match["status"], match["round"], match["faceit_url"], match["team1_id"], match["team2_id"], match["winner"])
    )
    conn.commit()
    conn.close()
    