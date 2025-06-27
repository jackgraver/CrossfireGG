from sqlmodel import Session, select
from db.match.match_model import Match, MatchCaster
from db.match.match_sql import fetch_all_matches
from db.db import get_db_connection
from typing import List, Dict
from db.team.team_model import Team

def get_matches_with_casters() -> Dict[str, List[Dict]]:
    """
    Get all matches with caster information.
    Returns matches in two categories: claimed (with caster) and unclaimed (without caster)
    Only includes matches with status "FINISHED"
    """
    all_matches = fetch_all_matches()
    
    with Session(get_db_connection()) as session:
        # Get all MatchCaster entries
        caster_stmt = select(MatchCaster)
        casters = session.exec(caster_stmt).all()
        
        # Create a set of match_ids that have casters
        claimed_match_ids = {caster.match_id for caster in casters}
        
        # Separate matches into claimed and unclaimed
        claimed_matches = []
        unclaimed_matches = []
        
        # Process regular season matches - filter for FINISHED status
        for match in all_matches["reg_season"]:
            if match["status"] != "FINISHED":
                if match["match_id"] in claimed_match_ids:
                    # Find the caster for this match
                    caster_stmt = select(MatchCaster).where(MatchCaster.match_id == match["match_id"])
                    caster = session.exec(caster_stmt).first()
                    match["caster_id"] = caster.caster_id if caster else None
                    claimed_matches.append(match)
                else:
                    unclaimed_matches.append(match)
        
        # Process playoffs matches - filter for FINISHED status
        for match in all_matches["playoffs"]:
            if match["status"] != "FINISHED":
                if match["match_id"] in claimed_match_ids:
                    # Find the caster for this match
                    caster_stmt = select(MatchCaster).where(MatchCaster.match_id == match["match_id"])
                    caster = session.exec(caster_stmt).first()
                    match["caster_id"] = caster.caster_id if caster else None
                    claimed_matches.append(match)
                else:
                    unclaimed_matches.append(match)
        
        return {
            "claimed": claimed_matches,
            "unclaimed": unclaimed_matches
        }
        
def claim_match(match_id: str, caster_id: int) -> bool:
    """
    Claim a match for casting by a specific caster
    """
    try:
        with Session(get_db_connection()) as session:
            # Check if match already has a caster
            existing_caster = session.exec(
                select(MatchCaster).where(MatchCaster.match_id == match_id)
            ).first()
            
            if existing_caster:
                return False  # Match already claimed
            
            # Create new MatchCaster entry
            match_caster = MatchCaster(match_id=match_id, caster_id=caster_id)
            session.add(match_caster)
            session.commit()
            return True
    except Exception as e:
        print(f"Error claiming match: {e}")
        return False

def unclaim_match(match_id: str, caster_id: int) -> bool:
    """
    Remove a caster's claim on a match
    """
    try:
        with Session(get_db_connection()) as session:
            # Find and delete the MatchCaster entry
            match_caster = session.exec(
                select(MatchCaster).where(
                    MatchCaster.match_id == match_id,
                    MatchCaster.caster_id == caster_id
                )
            ).first()
            
            if match_caster:
                session.delete(match_caster)
                session.commit()
                return True
            return False
    except Exception as e:
        print(f"Error unclaiming match: {e}")
        return False 