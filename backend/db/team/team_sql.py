from sqlmodel import Session, select
from typing import List, Dict
from db.db import get_db_connection
from db.team.team_model import Team

def fetch_all_teams() -> List[Dict]:
    with Session(get_db_connection()) as session:
        teams = session.exec(select(Team)).all()
        return [team.dict() for team in teams]
    
def get_team_record(team_id: str) -> str:
    with Session(get_db_connection()) as session:
        team = session.get(Team, team_id)
        if team:
            return f"{team.win}-{team.loss}"
        else:
            print("no row")
            return "0-0"
        
def update_team_record(team: dict, won: bool):
    with Session(get_db_connection()) as session:
        existing = session.get(Team, team["team_id"])

        if existing:
            if won:
                existing.win += 1
            else:
                existing.loss += 1
        else:
            win = 1 if won else 0
            loss = 0 if won else 1
            existing = Team(
                team_id=team["team_id"],
                team_name=team["name"],
                team_logo=team.get("team_logo"),
                seed=-1,
                win=win,
                loss=loss,
                paid=1,
                joined_tournament=1
            )
            session.add(existing)

        session.commit()

def get_team_info(team_id: str) -> dict:
    if not team_id:
        return {}

    with Session(get_db_connection()) as session:
        team = session.get(Team, team_id)
        return team.dict() if team else {}