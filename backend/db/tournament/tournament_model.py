from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class SubTournament(SQLModel, table=True):
    __tablename__ = "sub_tournament"
    sub_t_id: str = Field(primary_key=True)
    t_id: str = Field(foreign_key="tournament.t_id")
    t_name: str
    start_date: Optional[int] = None
    end_date: Optional[int] = None

    tournament: Optional["Tournament"] = Relationship(back_populates="sub_tournament")


class Tournament(SQLModel, table=True):
    t_id: str = Field(primary_key=True)
    t_name: str
    start_date: Optional[int] = None
    end_date: Optional[int] = None

    sub_tournament: List[SubTournament] = Relationship(back_populates="tournament")