from sqlalchemy import UniqueConstraint
from sqlmodel import SQLModel, Field
from typing import Optional

class Player(SQLModel, table=True):
    """
    player_id_i: str - primary key <br>
    player_id: str <br>
    team_id: str - foreign_key team.team_id <br>
    sub_t_id: str - foreign_key sub_tournament.sub_t_id <br>
    player_name: str <br>
    player_logo: str <br>
    """
    __table_args__ = (UniqueConstraint("player_id", "sub_t_id"),)
    
    player_id_i: str = Field(primary_key=True)
    player_id: str
    team_id: str = Field(foreign_key="team.team_id")
    sub_t_id: Optional[str] = Field(default=None, foreign_key="sub_tournament.sub_t_id", primary_key=True)
    player_name: str
    player_logo: Optional[str] = None
    
class PlayerStats(SQLModel, table=True):
    """
    ps_id: str - primary key <br>
    player_id: str - foreign_key player.player_id <br>
    match_id: str - foreign_key match.match_id <br>
    map_id: str - foreign_key map.map_id <br>
    kills: int <br>
    deaths: int <br>
    assists: int <br>
    adr: int <br>
    damage: int <br>
    """
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