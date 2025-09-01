from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse

from db.tournament.tournament_model import Tournament
from db.metadata.metadata_sql import write_metadata
from db.tournament.tournament_sql import get_all_tournaments, get_current_sub_tournament_by_name, get_current_tournament, insert_tournament

import time

router = APIRouter()

@router.get("/all")
async def all_tournaments():
    return {"tournaments": get_all_tournaments()}

@router.post("/update_current_tournament")
async def update_current_tournament(request: Request):
    data = await request.json()
    t_id = data.get("t_id")
    
    if not t_id:
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    write_metadata("last_refresh", t_id)
    return JSONResponse(content={"message": "Current Tournament Updated."}, status_code=201) 

@router.get("/current_tournaments")
async def current_tournament():
    current_tournament = get_current_tournament()
    current_regular_season = get_current_sub_tournament_by_name("REGULAR SEASON")
    current_playoffs = get_current_sub_tournament_by_name("PLAYOFFS")
    return {"current_tournament": current_tournament, "current_regular_season": current_regular_season, "current_playoffs": current_playoffs}

@router.post("/create")
async def create_tournament(request: Request):
    data = await request.json()
    print(data)
    tournament_id = data.get("tournament_id")
    tournament_name = data.get("tournament_name")
    
    if not tournament_id or not tournament_name:
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    insert_tournament(Tournament(
        t_id=tournament_id,
        t_name=tournament_name,
        start_date=int(time.time()),
        end_date=int(time.time()) + 10 * 24 * 60 * 60,
    ))
    
    return JSONResponse(content={"message": "Tournament Created."}, status_code=201)    