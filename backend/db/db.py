import sqlite3

# from db.matches import create_matches_table
# from db.teams import create_teams_table
# from db.metadata import create_metadata_table
# from db.users import create_users_table
# from db.tournament import create_tournament_tables

from sqlmodel import SQLModel, create_engine

# def get_db_connection() -> sqlite3.Connection:
#     return sqlite3.connect("oss.db")

# def init_tables(conn):
#     create_tournament_tables(conn)
#     create_teams_table(conn)
#     create_matches_table(conn)
#     create_metadata_table(conn)
#     create_users_table(conn)
    

engine = create_engine("sqlite:///oss.db", echo=False)

def get_db_connection():
    init_tables()
    return engine

def init_tables():
    SQLModel.metadata.create_all(engine)