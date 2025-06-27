import asyncio
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from jose import jwt

from db.user.user_model import *
from db.user.user_sql import *
from db.db import *
from db.match.match_model import *
from db.match.match_sql import *
from db.match.match_util import process_matches
from db.match.match_caster_sql import *
from db.team.team_model import *
from db.team.team_sql import *
from db.metadata.metadata_model import *
from db.metadata.metadata_sql import *
from db.tournament.tournament_sql import *
from db.player.player_sql import *

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")


@app.middleware("http")
async def global_wrapper(request: Request, call_next):
    await asyncio.sleep(0)
    return await call_next(request)

@app.get("/stats")
def get_stats():
    res = get_all_player_stats()
    return res;

@app.get("/stats/{match_id}")
def get_stats_by_match_id(match_id: str):
    res = get_player_stats_by_match_id(match_id)
    return res

@app.get("/players")
def get_players():
    res = get_all_players()
    return res

@app.get("/matches")
def get_matches():
    res = fetch_all_matches()
    return res

@app.get("/matches/casting")
def get_matches_for_casting():
    res = get_matches_with_casters()
    return res

@app.post("/matches/claim")
async def claim_match_endpoint(request: Request):
    data = await request.json()
    match_id = data.get("match_id")
    
    if not match_id:
        raise HTTPException(status_code=400, detail="Missing match_id")
    
    # TODO: Get user_id from JWT token when authentication is implemented
    # For now, we'll use a placeholder user_id
    # In a real implementation, you would decode the JWT token to get the user_id
    caster_id = 1  # Placeholder - should come from JWT token
    
    success = claim_match(match_id, caster_id)
    if not success:
        raise HTTPException(status_code=400, detail="Match already claimed or invalid match_id")
    
    return JSONResponse(content={"message": "Match claimed successfully"}, status_code=200)

@app.post("/matches/unclaim")
async def unclaim_match_endpoint(request: Request):
    data = await request.json()
    match_id = data.get("match_id")
    
    if not match_id:
        raise HTTPException(status_code=400, detail="Missing match_id")
    
    # TODO: Get user_id from JWT token when authentication is implemented
    caster_id = 1  # Placeholder - should come from JWT token
    
    success = unclaim_match(match_id, caster_id)
    if not success:
        raise HTTPException(status_code=400, detail="Match not claimed by this user or invalid match_id")
    
    return JSONResponse(content={"message": "Match unclaimed successfully"}, status_code=200)

@app.get("/teams")
def get_teams():
    teams_data = fetch_all_teams()
    last_update = query_last_update()
    return {
        "reg_season": teams_data["reg_season"],
        "playoffs": teams_data["playoffs"],
        "last_update": last_update
    }
    
@app.get("/team/{team_id}")
def get_team(team_id: str):
    team_info = get_team_info(team_id)
    matches = get_team_matches(team_id)
    res = {
        "team": team_info,
        "matches": matches
    }
    return res

@app.get("/last_update")
def get_last_update():
    last_update = query_last_update()
    return last_update

@app.get("/refresh")
def refresh_teams():
    process_matches()
    write_metadata("last_refresh", str(int(datetime.now().timestamp())))
    return {"teams:": [], "matches": []}

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY not set.")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_minutes: int = 60):
    to_encode = data.copy()
    expire = datetime.now() + datetime.timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/sign-in")
async def sign_in(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Missing email or password")

    user = get_user_by_email(email)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user["user_id"], "email": user["email"]})
    return {"access_token": token}

@app.post("/sign-up")
async def sign_up(request: Request):
    data = await request.json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        raise HTTPException(status_code=400, detail="Missing required fields")

    if user_exists(email):
        raise HTTPException(status_code=400, detail="Email already in use")

    hashed_password = hash_password(password)
    insert_user(email, hashed_password)

    return JSONResponse(content={"message": "User created successfully"}, status_code=201)


@app.post("/update_current_tournament")
async def update_current_tournament(request: Request):
    data = await request.json()
    t_id = data.get("t_id")
    
    if not t_id:
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    write_metadata("last_refresh", t_id)
    return JSONResponse(content={"message": "Current Tournament Updated."}, status_code=201) 

@app.get("/current_tournaments")
async def current_tournament():
    ct = get_current_tournament()
    cr = get_current_sub_tournament_by_name("REGULAR SEASON")
    cp = get_current_sub_tournament_by_name("PLAYOFFS")
    return {"ct": ct, "cr": cr, "cp": cp}

@app.get("/current_stage")
async def current_stage():
    return get_metadata_value("current_stage")

@app.post("/toggle_stage")
async def toggle_stage():
    """
    Toggle the current stage between 'REGULAR SEASON' and 'PLAYOFFS'
    """
    current_stage = get_metadata_value("current_stage")
    
    if current_stage == "REGULAR SEASON":
        new_stage = "PLAYOFFS"
    elif current_stage == "PLAYOFFS":
        new_stage = "REGULAR SEASON"
    else:
        # If current_stage is not set or is something else, default to REGULAR SEASON
        new_stage = "REGULAR SEASON"    
    
    write_metadata("current_stage", new_stage)
    
    return JSONResponse(
        content={
            "message": f"Stage switched to {new_stage}",
            "previous_stage": current_stage,
            "current_stage": new_stage
        }, 
        status_code=200
    )