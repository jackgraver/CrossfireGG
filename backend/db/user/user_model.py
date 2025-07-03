from typing import Optional
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    """ 
    user_id: str - primary_key<br>
    email: str - unique<br>
    faceit_id: str<br>
    team_id: str<br>
    password: str

    Args:
        SQLModel (_type_): _description_
        table (bool, optional): _description_. Defaults to True.
    """
    user_id: Optional[str] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    faceit_id: Optional[str] = Field(default=None)
    team_id: Optional[str] = Field(default=None)
    password: str

class UserPublic(SQLModel):
    user_id: str
    email: str
    faceit_id: str | None
    team_id: str | None