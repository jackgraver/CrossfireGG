from sqlmodel import Session, select
from db.match.match_model import Match
from db.db import get_db_connection
from typing import List, Dict
from db.team.team_sql import get_team_info
from db.tournament.tournament_sql import get_current_sub_tournament_by_name

def write_match(match_dict: dict):
    match = Match(**match_dict)
    with Session(get_db_connection()) as session:
        existing = session.get(Match, match.match_id)
        if not existing:
            session.add(match)
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

            team1 = get_team_info(m.team1_id)
            team2 = get_team_info(m.team2_id)

            match_dict["teams"] = {
                "team1": team1,
                "team2": team2
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