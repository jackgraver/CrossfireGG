import sqlite3
from typing import List, Dict

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
