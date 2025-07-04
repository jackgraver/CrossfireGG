from uuid import uuid4
from sqlmodel import Session, select
from db.user.user_model import User, UserPublic
from db.db import get_db_connection
from typing import Optional
from passlib.hash import bcrypt
import re

def insert_user(id: str, email: str, faceit_id: str, team_id: str, hashed_password: str):
    """Insert a new user or update existing user's password"""
    
    if not (re.match("^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$", hashed_password)):
        raise Exception("Invalid hashed_password format")
    
    if id:
        user = User(user_id=id, email=email, faceit_id=faceit_id, team_id=team_id, password=hashed_password)
    else:
        id = str(uuid4())
        user = User(user_id=id, email=email, faceit_id=faceit_id, team_id=team_id, password=hashed_password)
    with Session(get_db_connection()) as session:
        # Check if user exists
        existing_user = session.exec(
            select(User).where(User.email == email)
        ).first()
        
        if existing_user:
            # Update password
            existing_user.faceit_id = faceit_id
            existing_user.team_id = team_id
            existing_user.password = hashed_password
        else:
            # Create new user
            session.add(user)
        
        session.commit()
    return id

def user_exists(email: str) -> bool:
    """Check if a user exists by email"""
    with Session(get_db_connection()) as session:
        user = session.exec(
            select(User).where(User.email == email)
        ).first()
        return user is not None

def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email, returns dict with user_id, email, and hashed_password"""
    with Session(get_db_connection()) as session:
        user = session.exec(
            select(User).where(User.email == email)
        ).first()
        
        if user:
            return {
                "user_id": user.user_id,
                "email": user.email,
                "hashed_password": user.password,
            }
        return None

def get_user_by_id(user_id: int) -> Optional[User]:
    """Get user by user_id, returns User object"""
    with Session(get_db_connection()) as session:
        return session.get(User, user_id)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    return bcrypt.verify(plain_password, hashed_password)

def hash_password(plain_password: str) -> str:
    """Hash a plain password using bcrypt"""
    return bcrypt.hash(plain_password)

def fetch_all_users():
    with Session(get_db_connection()) as session:
        users = session.exec(select(User.user_id, User.email, User.faceit_id, User.team_id)).all()
        return [UserPublic(user_id=row[0], email=row[1], faceit_id=row[2], team_id=row[3]) for row in users]