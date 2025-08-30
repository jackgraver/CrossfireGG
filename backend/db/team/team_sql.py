import os
from dotenv import load_dotenv
import requests
from sqlmodel import Session, select
from typing import List, Dict
from db.metadata.metadata_sql import get_metadata_value
from db.db import get_db_connection
from db.team.team_model import Team
from db.tournament.tournament_sql import get_current_sub_tournament_id, get_current_tournament, get_sub_tournament_name_by_id, get_current_sub_tournament_by_name
from db.match.match_model import Match

def fetch_all_teams() -> Dict[str, List[Dict]]:
    # Get current tournament's regular season and playoffs sub-tournaments
    reg_season_sub_t = get_current_sub_tournament_by_name("REGULAR SEASON")
    playoffs_sub_t = get_current_sub_tournament_by_name("PLAYOFFS")
    
    reg_season_id = reg_season_sub_t.sub_t_id if reg_season_sub_t else None
    playoffs_id = playoffs_sub_t.sub_t_id if playoffs_sub_t else None
    
    with Session(get_db_connection()) as session:
        results = session.exec(select(Team)).all()
        
        reg_season_teams = []
        playoffs_teams = []
        
        for team in results:
            team_dict = team.model_dump()
            
            # Split teams based on sub_t_id
            if team.sub_t_id == reg_season_id:
                reg_season_teams.append(team_dict)
            elif team.sub_t_id == playoffs_id:
                playoffs_teams.append(team_dict)

        return {
            "reg_season": reg_season_teams,
            "playoffs": playoffs_teams
        }
    
def get_team_names() -> List[str]:
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.sub_t_id == get_current_sub_tournament_id())
        teams = session.exec(stmt).all()
        return [team.team_name for team in teams]

def get_team_record(team_id: str, sub_t_id: str = None, tournament_name: str = None) -> str:
    with Session(get_db_connection()) as session:
        if sub_t_id:
            stmt = select(Team).where(
                Team.team_id == team_id,
                Team.sub_t_id == sub_t_id
            )
        else:
            stmt = select(Team).where(Team.team_id == team_id)
        team = session.exec(stmt).first()
        
        if not team:
            if tournament_name == "PLAYOFFS":
                return "RO16"
            return "0-0"
        
        # If tournament_name is not provided, try to get it from sub_t_id
        if not tournament_name and sub_t_id:
            tournament_name = get_sub_tournament_name_by_id(sub_t_id)
        
        # Handle different tournament types
        if tournament_name == "PLAYOFFS":
            # Playoffs format: 0-0 = RO16, 1-0 = QF, 2-0 = SF, 3-0 = F
            if team.win == 0 and team.loss == 0:
                return "RO16"
            elif team.win == 1 and team.loss == 0:
                return "QF"
            elif team.win == 2 and team.loss == 0:
                return "SF"
            elif team.win == 3 and team.loss == 0:
                return "F"
            else:
                # For any other record, return the standard format
                return f"{team.win}-{team.loss}"
        else:
            # Regular Season format (default): return win-loss record
            return f"{team.win}-{team.loss}"
        
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

def get_team_info(team_id: str):
    if not team_id:
        return {}   
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.team_id == team_id)
        team = session.exec(stmt).first()
        return team if team else None
    
def get_team_info_by_name(team_name: str) -> dict:
    if not team_name:
        return {}   
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.team_name == team_name)
        team = session.exec(stmt).first()
        return team.model_dump() if team else {}
    
def get_team_matches(team_id: str) -> dict:
    with Session(get_db_connection()) as session:
        # Get matches where the team is either team1 or team2
        stmt = select(Match).where(
            (Match.team1_id == team_id) | (Match.team2_id == team_id)
        )
        matches = session.exec(stmt).all()
        
        result = []
        for match in matches:
            match_dict = match.model_dump()
            
            # Fetch team information for both teams
            team1_stmt = select(Team).where(Team.team_id == match.team1_id)
            team2_stmt = select(Team).where(Team.team_id == match.team2_id)
            
            team1 = session.exec(team1_stmt).first()
            team2 = session.exec(team2_stmt).first()
            
            match_dict["teams"] = {
                "team1": team1.model_dump() if team1 else {},
                "team2": team2.model_dump() if team2 else {}
            }
            
            result.append(match_dict)
        
        return result
    
def set_team_seed(team_id: str, seed: int) -> bool:
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(
            Team.team_id == team_id
        )
        team = session.exec(stmt).first()
        
        if team:
            team.seed = seed
            session.commit()
            return True
        return False
    
def set_team_paid(team_id: str, paid: int) -> bool:
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(
            Team.team_id == team_id
        )
        team = session.exec(stmt).first()
        
        if team:
            team.paid = paid
            session.commit()
            return True
        return False

def set_team_joined(team_id: str, joined: int) -> bool:
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(
            Team.team_id == team_id
        )
        team = session.exec(stmt).first()
        
        if team:
            team.joined_tournament = joined
            session.commit()
            return True
        return False

def create_team(team: Team):
    if not team:
        return
    
    with Session(get_db_connection()) as session:
        session.add(team)
        session.commit()
        return
    
def get_teams_by_sub_t_id(sub_t_id: str):
    with Session(get_db_connection()) as session:
        teams = session.exec(select(Team).where(Team.sub_t_id == sub_t_id)).all()
        return teams    
    
load_dotenv()

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")

def fetch_faceit_info(team_id: str):
    try:
        response = requests.get(
            f'https://open.faceit.com/data/v4/teams/{team_id}',
            headers={
                "Authorization": f"Bearer {FACEIT_API_KEY}",
                "Accept": "application/json",
            },
        )
        response.raise_for_status()
        id = response.json().get("team_id")
        return id
    except Exception as e:
        print('Exception fetching faceit info', e)
        return None
    
def check_already_registered(team_id: str):
    current_tournament = get_current_sub_tournament_id()
    
    with Session(get_db_connection()) as session:
        stmt = select(Team).where(Team.team_id == team_id).where(Team.sub_t_id == current_tournament)
        team = session.exec(stmt).first()
        return team