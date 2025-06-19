from sqlmodel import SQLModel, Field
from typing import Optional

class Team(SQLModel, table=True):
    team_id: str = Field(primary_key=True)
    team_name: str
    team_logo: Optional[str] = None
    seed: int = -1
    win: int = 0
    loss: int = 0
    paid: int = 1
    joined_tournament: int = 1