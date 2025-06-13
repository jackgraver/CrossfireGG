import datetime
import sqlite3
from typing import List, Dict, Optional

def get_db_connection() -> sqlite3.Connection:
    return sqlite3.connect("oss.db")

def create_teams_table(conn: sqlite3.Connection):
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS teams (
            team_id TEXT PRIMARY KEY,
            team_name TEXT,
            seed INTEGER,
            win INTEGER,
            loss INTEGER,
            paid INTEGER,
            joined_tournament INTEGER
        )
    """)
    conn.commit()


def fetch_all_teams(conn: sqlite3.Connection) -> List[Dict]:
    create_teams_table(conn)

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teams")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]

def get_team_record(conn, team_id):
    cursor = conn.cursor()
    cursor.execute("SELECT win, loss FROM teams WHERE team_id = ?", (team_id,))
    row = cursor.fetchone()
    win, loss = row if row else (0, 0)
    
    if not row:
        print("no row")
    return f"{win}-{loss}"

def update_team_record(conn, team: dict, won: bool):
    cursor = conn.cursor()

    # Check if the team exists
    cursor.execute("SELECT win, loss FROM teams WHERE team_id = ?", (team["team_id"],))
    row = cursor.fetchone()

    if row:
        win, loss = row
        if won:
            win += 1
        else:
            loss += 1
        cursor.execute("UPDATE teams SET win = ?, loss = ? WHERE team_id = ?", (win, loss, team["team_id"]))
    else:
        # If team doesn't exist, insert it
        win = 1 if won else 0
        loss = 0 if won else 1
        cursor.execute("INSERT INTO teams (team_id, team_name, seed, win, loss, paid, joined_tournament) VALUES (?, ?, -1, ?, ?, 1, 1)", (team["team_id"], team["name"], win, loss))
        
    conn.commit()

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
    create_matches_table(conn)

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


def get_team_info(conn: sqlite3.Connection, team_id: str) -> dict:
    if not team_id:
        return {}

    cursor = conn.cursor()
    cursor.execute("SELECT team_id, team_name, seed, win, loss, paid, joined_tournament FROM teams WHERE team_id = ?", (team_id,))
    row = cursor.fetchone()

    if row:
        keys = ["team_id", "team_name", "seed", "win", "loss", "paid", "joined_tournament"]
        return dict(zip(keys, row))
    else:
        return {}


def write_match(match: dict):
    conn = sqlite3.connect("oss.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR IGNORE INTO matches (match_id, status, round, faceit_url, team1_id, team2_id, winner) VALUES (?, ?, ?, ?, ?, ?, ?);",
        (match["match_id"], match["status"], match["round"], match["faceit_url"], match["team1_id"], match["team2_id"], match["winner"])
    )
    conn.commit()
    conn.close()
    
    
def create_metadata_table(conn: sqlite3.Connection):
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS metadata (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    """)
    conn.commit()

def write_metadata(conn, key, value):
    create_metadata_table(conn)
    
    conn = sqlite3.connect("oss.db")
    cursor = conn.cursor()
    cursor.execute("""
            INSERT INTO metadata (key, value)
            VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value;
        """, (key, value))
    conn.commit()
    conn.close()
    

def query_last_update(conn: sqlite3.Connection) -> Optional[Dict]:
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM metadata WHERE key = 'last_refresh';")
    return cursor.fetchone()