from sqlmodel import Session, select
from typing import List, Dict
from db.db import get_db_connection
from db.team.team_model import Team

def fetch_all_teams() -> List[Dict]:
    with Session(get_db_connection()) as session:
        teams = session.exec(select(Team)).all()
        return [team.model_dump() for team in teams]
    
def get_team_record(team_id: str) -> str:
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.team_id == team_id)
        team = session.exec(stmt).first()
        if team:
            return f"{team.win}-{team.loss}"
        else:
            return "0-0"
        
def update_team_record(team: dict, won: bool, current_sub_t_id: str = None):
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(
            Team.team_id == team["team_id"],
            Team.sub_t_id == current_sub_t_id
        )
        existing = session.exec(stmt).first()

        if existing:
            if won:
                existing.win += 1
            else:
                existing.loss += 1
            session.commit()
            return

        win = 1 if won else 0
        loss = 0 if won else 1
        new_team = Team(
            team_id_i=team["team_id_i"],
            team_id=team["team_id"],
            sub_t_id=current_sub_t_id,
            team_name=team["name"],
            team_logo=team.get("team_logo"),
            seed=-1,
            win=win,
            loss=loss,
            paid=1,
            joined_tournament=1
        )
        session.add(new_team)
        session.commit()

def get_team_info(team_id: str) -> dict:
    if not team_id:
        return {}

    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.team_id == team_id)
        team = session.exec(stmt).first()
        return team.model_dump() if team else {}