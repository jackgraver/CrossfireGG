from sqlmodel import Session, select
from db.metadata.metadata_model import Metadata
from db.db import get_db_connection
from db.tournament.tournament_model import Tournament, SubTournament
from typing import Optional
from db.metadata.metadata_sql import get_metadata_value

def get_all_tournaments() -> list[Tournament]:
    with Session(get_db_connection()) as session:
        stmt = select(Tournament).order_by(Tournament.start_date.desc())
        return session.exec(stmt).all()

def insert_tournament(tournament: Tournament):
    with Session(get_db_connection()) as session:
        session.add(tournament)
        session.commit()

def get_current_tournament() -> Optional[Tournament]:
    with Session(get_db_connection()) as session:
        # Get current tournament ID from metadata
        meta_stmt = select(Metadata).where(Metadata.key == "current_tournament")
        meta_entry = session.exec(meta_stmt).first()

        if not meta_entry:
            return None

        current_t_id = meta_entry.value

        # Fetch the tournament by ID
        tour_stmt = select(Tournament).where(Tournament.t_id == current_t_id)
        return session.exec(tour_stmt).first()
    
def get_current_sub_tournament_by_name(name: str) -> Optional[SubTournament]:
    current = get_current_tournament()
    if not current:
        return None

    with Session(get_db_connection()) as session:
        stmt = select(SubTournament).where(
            SubTournament.t_id == current.t_id,
            SubTournament.t_name == name
        )
        return session.exec(stmt).first()

def get_current_sub_tournament_id() -> Optional[str]:
    """
    Get the current sub_tournament ID based on:
    - current_tournament from metadata
    - current_stage from metadata (which should match t_name in sub_tournament table)
    """
    current_tournament_id = get_metadata_value("current_tournament")
    current_stage = get_metadata_value("current_stage")
    
    if not current_tournament_id or not current_stage:
        return None
    
    with Session(get_db_connection()) as session:
        stmt = select(SubTournament).where(
            SubTournament.t_id == current_tournament_id,
            SubTournament.t_name == current_stage
        )
        sub_tournament = session.exec(stmt).first()
        return sub_tournament.sub_t_id if sub_tournament else None

def get_sub_tournament_name_by_id(sub_t_id: str) -> Optional[str]:
    """
    Get the sub_tournament name by its ID
    """
    with Session(get_db_connection()) as session:
        stmt = select(SubTournament).where(SubTournament.sub_t_id == sub_t_id)
        sub_tournament = session.exec(stmt).first()
        return sub_tournament.t_name if sub_tournament else None
    
def sub_tournament_by_tournament_and_stage(tournament_id: str, stage: str):
    if not tournament_id or not stage:
        return None
    with Session(get_db_connection()) as session:
        stmt = select(SubTournament).where(
            SubTournament.t_id == tournament_id,
            SubTournament.t_name.like(f"%{stage.capitalize()}%")
        )
        return session.exec(stmt).first()