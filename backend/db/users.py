import sqlite3
from typing import Optional
from passlib.hash import bcrypt

def create_users_table(conn: sqlite3.Connection) -> None:
    with conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        """)

def insert_user(conn: sqlite3.Connection, email: str, hashed_password: str) -> None:
    with conn:
        conn.execute("""
            INSERT INTO users (email, password)
            VALUES (?, ?)
            ON CONFLICT(email) DO UPDATE SET password = excluded.password
        """, (email, hashed_password))

def user_exists(conn: sqlite3.Connection, email: str) -> bool:
    cursor = conn.execute("SELECT 1 FROM users WHERE email = ? LIMIT 1", (email,))
    return cursor.fetchone() is not None

def get_user_by_email(conn: sqlite3.Connection, email: str) -> Optional[dict]:
    cursor = conn.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    if row:
        # Assumes row is (user_id, email, password)
        return {
            "user_id": row[0],
            "email": row[1],
            "hashed_password": row[2],
        }
    return None

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.verify(plain_password, hashed_password)