from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field
from typing import Optional

class Player(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("player_id", "sub_t_id"),)
    
    player_id_i: str = Field(primary_key=True)
    player_id: str
    team_id: str = Field(foreign_key="team.team_id")
    sub_t_id: Optional[str] = Field(default=None, foreign_key="sub_tournament.sub_t_id")
    player_name: str
    player_logo: Optional[str] = None
    
class PlayerStats(SQLModel, table=True):
    __tablename__ = "player_stats"
    
    ps_id: str = Field(primary_key=True)
    player_id: str = Field(foreign_key="player.player_id")
    match_id: str = Field(foreign_key="match.match_id")
    map_id: str = Field(foreign_key="map.map_id")
    kills: int
    deaths: int
    assists: int
    adr: int
    damage: int