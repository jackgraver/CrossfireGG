import sqlite3

from db.matches import create_matches_table
from db.teams import create_teams_table
from db.metadata import create_metadata_table

def get_db_connection() -> sqlite3.Connection:
    return sqlite3.connect("oss.db")

def init_tables(conn):
    create_teams_table(conn)
    create_matches_table(conn)
    create_metadata_table(conn)