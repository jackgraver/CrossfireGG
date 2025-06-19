import sqlite3

def create_tournament_tables(conn: sqlite3.Connection):
    cursor = conn.cursor()

    # Create tournaments table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tournaments (
            t_id STRING PRIMARY KEY,
            t_name TEXT,
            start_date INTEGER,
            end_date INTEGER
        )
    """)

    # Create sub_tournaments table with foreign key to tournaments
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sub_tournaments (
            sub_t_id STRING PRIMARY KEY,
            t_id STRING,
            t_name TEXT,
            start_date INTEGER,
            end_date INTEGER,
            FOREIGN KEY (t_id) REFERENCES tournaments(t_id)
        )
    """)

    conn.commit()
    