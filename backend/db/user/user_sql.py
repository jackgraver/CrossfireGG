from sqlmodel import Session, select
from db.user.user_model import User
from db.db import get_db_connection
from typing import Optional
from passlib.hash import bcrypt

def insert_user(email: str, hashed_password: str) -> None:
    """Insert a new user or update existing user's password"""
    user = User(email=email, password=hashed_password)
    with Session(get_db_connection()) as session:
        # Check if user exists
        existing_user = session.exec(
            select(User).where(User.email == email)
        ).first()
        
        if existing_user:
            # Update password
            existing_user.password = hashed_password
        else:
            # Create new user
            session.add(user)
        
        session.commit()

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
