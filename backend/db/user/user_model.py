from typing import Optional
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    """ 
    user_id: str - primary_key<br>
    email: str - unique<br>
    faceit_id: str<br>
    team_id: str<br>
    password: str
    """
    user_id: Optional[str] = Field(default=None, primary_key=True)
    user_name: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    faceit_id: Optional[str] = Field(default=None)
    team_id: Optional[str] = Field(default=None)
    password: str

class UserPublic(SQLModel):
    """
    user_id: str
    user_name: str
    email: str 
    faceit_id: str
    team_id: str
    """
    user_id: str
    user_name: str
    email: str
    faceit_id: str | None
    team_id: str | None
    
class UserRole(SQLModel, table=True):
    """
    user_id: str - primary_key<br> 
    role_id: int - primary_key<br>
    """
    __tablename__ = "user_role"
    
    user_id: str = Field(foreign_key="user.user_id", primary_key=True)
    role_id: int = Field(foreign_key="role.role_id", primary_key=True)
    
class Role(SQLModel, table=True):
    """
    role_id: int - primary_key<br>
    role_name: str <br>
    """
    role_id: int = Field(primary_key=True)
    role_name: str