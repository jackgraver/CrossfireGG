from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse

from db.metadata.metadata_sql import write_metadata
from db.tournament.tournament_sql import get_current_sub_tournament_by_name, get_current_tournament

router = APIRouter()

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
    ct = get_current_tournament()
    cr = get_current_sub_tournament_by_name("REGULAR SEASON")
    cp = get_current_sub_tournament_by_name("PLAYOFFS")
    return {"ct": ct, "cr": cr, "cp": cp}