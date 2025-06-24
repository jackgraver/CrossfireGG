from sqlmodel import Session, select
from db.match.match_model import Match, Map
from db.db import get_db_connection
from typing import List, Dict
from db.team.team_model import Team
from db.tournament.tournament_sql import get_current_sub_tournament_by_name

def write_match(match_dict: dict):
    match = Match(**match_dict)
    with Session(get_db_connection()) as session:
        existing = session.get(Match, match.match_id)
        if not existing:
            session.add(match)
            session.commit()

def write_map(map_dict: dict):
    map_obj = Map(**map_dict)
    with Session(get_db_connection()) as session:
        existing = session.get(Map, map_obj.map_id)
        if not existing:
            session.add(map_obj)
            session.commit()
            
def fetch_all_matches() -> Dict[str, List[Dict]]:
    # Get current tournament's regular season and playoffs sub-tournaments
    reg_season_sub_t = get_current_sub_tournament_by_name("REGULAR SEASON")
    playoffs_sub_t = get_current_sub_tournament_by_name("PLAYOFFS")
    
    reg_season_id = reg_season_sub_t.sub_t_id if reg_season_sub_t else None
    playoffs_id = playoffs_sub_t.sub_t_id if playoffs_sub_t else None
    
    with Session(get_db_connection()) as session:
        results = session.exec(select(Match)).all()
        
        reg_season_matches = []
        playoffs_matches = []
        
        for m in results:
            match_dict = m.model_dump()

            # Fetch team information directly instead of using get_team_info
            team1_stmt = select(Team).where(Team.team_id == m.team1_id)
            team2_stmt = select(Team).where(Team.team_id == m.team2_id)
            
            team1 = session.exec(team1_stmt).first()
            team2 = session.exec(team2_stmt).first()

            match_dict["teams"] = {
                "team1": team1.model_dump() if team1 else {},
                "team2": team2.model_dump() if team2 else {}
            }

            # Optionally remove raw team IDs from top-level
            match_dict.pop("team1_id", None)
            match_dict.pop("team2_id", None)

            # Split matches based on sub_t_id
            if m.sub_t_id == reg_season_id:
                reg_season_matches.append(match_dict)
            elif m.sub_t_id == playoffs_id:
                playoffs_matches.append(match_dict)

        return {
            "reg_season": reg_season_matches,
            "playoffs": playoffs_matches
        }