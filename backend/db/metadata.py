import sqlite3
from typing import Dict, Optional

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