from sqlmodel import Session, select
from db.match.match_model import Match
from db.db import get_db_connection
from typing import List, Dict
from db.team.team_sql import get_team_info

def write_match(match_dict: dict):
    match = Match(**match_dict)
    with Session(get_db_connection()) as session:
        existing = session.get(Match, match.match_id)
        if not existing:
            session.add(match)
            session.commit()
            
def fetch_all_matches() -> List[Dict]:
    with Session(get_db_connection()) as session:
        results = session.exec(select(Match)).all()
        matches = []
        for m in results:
            match_dict = m.dict()

            team1 = get_team_info(m.team1_id)
            team2 = get_team_info(m.team2_id)

            match_dict["teams"] = {
                "team1": team1,
                "team2": team2
            }

            # Optionally remove raw team IDs from top-level
            match_dict.pop("team1_id", None)
            match_dict.pop("team2_id", None)

            matches.append(match_dict)

        return matches