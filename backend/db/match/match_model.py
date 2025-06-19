from typing import Optional
from sqlmodel import SQLModel, Field

class Match(SQLModel, table=True):
    match_id: str = Field(primary_key=True)
    sub_t_id: Optional[str] = Field(default=None, foreign_key="sub_tournament.sub_t_id")
    status: Optional[str] = None
    round: Optional[str] = None
    faceit_url: Optional[str] = None
    team1_id: Optional[str] = None
    team2_id: Optional[str] = None
    winner: Optional[str] = None
    team1_score: Optional[int] = 0
    team2_score: Optional[int] = 0