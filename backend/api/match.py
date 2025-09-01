
from fastapi import APIRouter, Depends, HTTPException, Request, Query
from fastapi.responses import JSONResponse

from api.auth import get_auth_user
from db.user.user_sql import get_user_by_id
from db.match.match_caster_sql import claim_match, get_matches_with_casters, unclaim_match
from db.metadata.metadata_sql import write_metadata
from db.match.match_sql import fetch_all_matches, fetch_match, fetch_matches_by_tournament
from db.tournament.tournament_sql import get_current_tournament, get_all_tournaments
from db.match.match_util import process_matches

from datetime import datetime, timezone

router = APIRouter()

@router.get("/refresh")
async def refresh_teams():
    await process_matches()
    write_metadata("last_refresh", str(int(datetime.now().timestamp())))
    return {"teams:": [], "matches": []}

@router.get("/all")
def get_matches(tournament_id: str = Query(None, description="Optional tournament ID to filter matches")):
    if tournament_id:
        # Use the tournament_id passed in query params
        res = fetch_matches_by_tournament(tournament_id)
    else:
        # No tournament_id provided, use current tournament logic
        current_tournament = get_current_tournament()
        print(current_tournament)
        if current_tournament.start_date > datetime.now(timezone.utc).timestamp():
            all_tournaments = get_all_tournaments()
            most_recent_tournament = max(filter(lambda t: t.t_id != current_tournament.t_id, all_tournaments), key=lambda t: t.start_date)
            print(most_recent_tournament)
            res = fetch_matches_by_tournament(most_recent_tournament.t_id)
        else:
            res = fetch_matches_by_tournament(get_current_tournament().t_id)
    return res

@router.get("/casting")
def get_matches_for_casting():
    res = get_matches_with_casters()
    return res

@router.get("/{match_id}")
def get_match(match_id: str):
    res = fetch_match(match_id)
    return res

@router.post("/claim")
async def claim_match_endpoint(request: Request, current_user: str = Depends(get_auth_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="No JWT token found")

    data = await request.json()
    match_id = data.get("match_id")
    
    if not match_id:
        raise HTTPException(status_code=400, detail="Missing match_id")
    
    if current_user:
        caster_id = get_user_by_id(current_user)
        if not caster_id:
            raise HTTPException(status_code=401, detail="Invalid user_id")
    
    success = claim_match(match_id, caster_id.user_id)
    
    if not success:
        raise HTTPException(status_code=400, detail="Match already claimed or invalid match_id")
    
    return JSONResponse(content={"message": "Match claimed successfully"}, status_code=200)

@router.post("/unclaim")
async def unclaim_match_endpoint(request: Request, current_user: str = Depends(get_auth_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="No JWT token found")
    
    data = await request.json()
    match_id = data.get("match_id")
    
    if not match_id:
        raise HTTPException(status_code=400, detail="Missing match_id")
    
    if current_user:
        caster_id = get_user_by_id(current_user)
        if not caster_id:
            raise HTTPException(status_code=401, detail="Invalid user_id")
        
    success = unclaim_match(match_id, caster_id.user_id)
    if not success:
        raise HTTPException(status_code=400, detail="Match not claimed by this user or invalid match_id")
    
    return JSONResponse(content={"message": "Match unclaimed successfully"}, status_code=200)
