from typing import Optional
from sqlmodel import SQLModel, Field

class Match(SQLModel, table=True):
    """
    match_id: str - primary key <br>
    sub_t_id: str - foreign_key sub_tournament.sub_t_id <br>
    status: str <br>
    scheduled_at: int <br>
    round: str <br>
    faceit_url: str <br>
    team1_id: str <br>
    team2_id: str <br>
    winner: str <br>
    team1_score: int <br>
    team2_score: int <br>
    """
    match_id: str = Field(primary_key=True)
    sub_t_id: Optional[str] = Field(default=None, foreign_key="sub_tournament.sub_t_id")
    status: Optional[str] = None
    scheduled_at: Optional[int] = None
    round: Optional[str] = None
    faceit_url: Optional[str] = None
    team1_id: Optional[str] = None
    team2_id: Optional[str] = None
    winner: Optional[str] = None
    team1_score: Optional[int] = 0
    team2_score: Optional[int] = 0
    
    
class Map(SQLModel, table=True):
    """
    map_id: str - primary key <br>
    match_id: str - foreign_key match.match_id <br>
    map_name: str <br>
    round: int <br>
    winner_id: str - foreign_key team.team_id <br>
    team1_score: int <br>
    team2_score: int <br>
    """
    map_id: str = Field(primary_key=True)
    match_id: str = Field(foreign_key="match.match_id")
    map_name: str
    round: int
    winner_id: str = Field(foreign_key="team.team_id")
    team1_score: int
    team2_score: int


class MatchCaster(SQLModel, table=True):
    """
    match_id: str - primary key <br>
    caster_id: int - foreign_key user.user_id <br>
    """
    __tablename__ = "match_caster"
    
    match_id: str = Field(primary_key=True, foreign_key="match.match_id")
    caster_id: int = Field(primary_key=True, foreign_key="user.user_id")