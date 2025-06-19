from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field
from typing import Optional

class Team(SQLModel, table=True):
    team_id_i: str = Field(primary_key=True)
    team_id: str
    sub_t_id: Optional[str] = Field(default=None, foreign_key="sub_tournament.sub_t_id")
    team_name: str
    team_logo: Optional[str] = None
    seed: int = -1
    win: int = 0
    loss: int = 0
    paid: int = 1
    joined_tournament: int = 1
    
    __table_args__ = (UniqueConstraint("team_id", "sub_t_id"),)