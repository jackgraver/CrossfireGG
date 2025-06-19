from typing import Optional
from sqlmodel import SQLModel, Field

class Match(SQLModel, table=True):
    match_id: str = Field(primary_key=True)
    sub_t_id: Optional[int] = Field(default=None, foreign_key="sub_tournaments.sub_t_id")
    status: Optional[str] = None
    round: Optional[str] = None
    faceit_url: Optional[str] = None
    team1_id: Optional[str] = None
    team2_id: Optional[str] = None
    winner: Optional[str] = None