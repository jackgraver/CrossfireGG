from asyncio import sleep
import asyncio
import os
import re
import uuid
from fastapi import APIRouter, Request, Response, status
import requests

from api.tournament import current_tournament
from db.player.player_model import Player
from db.player.player_sql import get_players_of_team, insert_player
from utils.faceit_api import fetch_from_api, fetch_from_file
from db.team.team_model import Team
from db.metadata.metadata_sql import query_last_update
from db.team.team_sql import check_already_registered, create_team, fetch_all_teams, fetch_faceit_info, get_team_info, get_team_info_by_name, get_team_matches, get_teams_by_sub_t_id, set_team_joined, set_team_paid, set_team_seed

router = APIRouter()

@router.get("/all")
def get_teams():
    teams_data = fetch_all_teams()
    last_update = query_last_update()
    return {
        "reg_season": teams_data["reg_season"],
        "playoffs": teams_data["playoffs"],
        "last_update": last_update
    }
    
@router.get("/{team_id}")
def get_team(team_id: str):
    team_info = get_team_info(team_id)
    matches = get_team_matches(team_id)
    res = {
        "team": team_info,
        "matches": matches
    }
    return res

@router.get('/{sub_t_id}/teams')
def get_teams_by_sub_tournament(sub_t_id: str):
    teams = get_teams_by_sub_t_id(sub_t_id)
    return teams

@router.post("/seed/{team_id}")
async def team_seed(request: Request, team_id: str):
    data = await request.json()
    seed = data.get("seed")
    
    if seed is None:
        return {"success": False, "message": "Seed value is required", "status": 400}
    
    result = set_team_seed(team_id, seed)
    if not result:
        return {"success": False, "message": "Team not found or failed to update seed", "status": 404}
    
    return {"success": True, "message": "Team seed updated successfully", "status": 200}

@router.post("/paid/{team_id}")
async def team_paid(request: Request, team_id: str):
    data = await request.json()
    paid = data.get("paid")
    
    if paid is None:
        return {"success": False, "message": "Paid status is required", "status": 400}
    
    result = set_team_paid(team_id, paid)
    if not result:
        return {"success": False, "message": "Team not found or failed to update paid status", "status": 404}
    
    return {"success": True, "message": "Team paid status updated successfully", "status": 200}

@router.post("/joined/{team_id}")
async def team_joined(request: Request, team_id: str):
    data = await request.json()
    joined = data.get("joined")
    
    if joined is None:
        return {"success": False, "message": "Joined status is required", "status": 400}
    
    result = set_team_joined(team_id, joined)
    if not result:
        return {"success": False, "message": "Team not found or failed to update joined status", "status": 404}
    
    return {"success": True, "message": "Team joined status updated successfully", "status": 200}

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")

def extract_faceit_id_from_link(link: str):
    match = re.search(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", link, re.IGNORECASE)
    team_id = match.group(0) if match else None
    if not team_id:
        return None
    return team_id


@router.get("/test_faceit_link/{link}")
async def test_faceit_link(link: str):
    if not link:
        return {"status": "error", "code": -1, "message": "Missing link"}

    if team_id := extract_faceit_id_from_link(link):
        print('extracted', team_id)
        if team := check_already_registered(team_id):
            return {"status": "success", "code": 2, "message": "Team already registered", "id": team.team_id}
        
        if not fetch_faceit_info(team_id):
            return {"status": "error", "code": -2, "message": "Failed to fetch Faceit info"}

        if get_team_info(team_id):
            return {"status": "success", "code": 1, "id": team_id}

    return {"status": "success", "code": 0}


REG_DEBUG = True
@router.post("/register")
async def register_team(request: Request):
    data = await request.json()
    team_id_i = str(uuid.uuid4())
    link = data.get("faceit_link", "")
    match = re.search(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", link, re.IGNORECASE)
    team_id = match.group(0) if match else None
    if not team_id:
        return {"error": "Invalid Faceit link"}
    
    ts = await current_tournament()
    sub_t_id = ts.get('current_regular_season').sub_t_id or ""
    team_name = data.get("team_name")
    
    if REG_DEBUG:
        team_data = fetch_from_file("team_data_on_register.json")
    else:
        team_data = fetch_from_api(f'https://open.faceit.com/data/v4/teams/{team_id}', write_to_file="team_data_on_register.json")

    team_logo = team_data.get('avatar') or ""
    
    players = team_data.get("members", [])
    
    if team_id and players:
        create_team(Team(
            team_id_i=team_id_i,
            team_id=team_id,
            sub_t_id=sub_t_id,
            team_name=team_name,
            team_logo=team_logo,
            seed=-1,
            win=0,
            loss=0,
            paid=0,
            joined_tournament=0
        ))
        for player in players:
            player_id = player.get("user_id")
            team_id = team_id
            
            if not player_id or not team_id:
                continue
            
            insert_player(Player(
                player_id_i=str(uuid.uuid4()),
                player_id=player_id,
                team_id=team_id,
                sub_t_id=sub_t_id,
                player_name=player.get("nickname"),
                player_logo=player.get("avatar")
            ))
    
    return {"team_id": team_id}

@router.post("/reregister")
async def reregister_team(request: Request):
    data = await request.json()
    team_name = data.get("team_name")
 
    # await asyncio.sleep(3)
    
    if not team_name:
        return {"error": "Team name is required"}
     
    ts = await current_tournament()
    sub_t_id = ts.get('current_regular_season').sub_t_id or ""
    
    if team_name:
        team = get_team_info_by_name(team_name)
        if not team:
            return {"error": "Team not found"}
        team_id = team.get("team_id")
        if team.get("sub_t_id") == sub_t_id:
            return {"error": "Team already registered", "team_id": team_id}
    
    create_team(Team(
        team_id_i=team.get('team_id_i'),
        team_id=team_id,
        sub_t_id=sub_t_id,
        team_name=team_name,
        team_logo=team.get('team_logo'),
        seed=-1,
        win=0,
        loss=0,
        paid=0,
        joined_tournament=0
    ))
    
    prev_players = get_players_of_team(team_id)
    for player in prev_players:
        insert_player(Player(
            player_id_i=str(uuid.uuid4()),
            player_id=player.player_id, 
            team_id=team.get('team_id'),
            sub_t_id=sub_t_id,
            player_name=player.player_name,
            player_logo=player.player_logo
        ))
    
    if REG_DEBUG:
        team_data = fetch_from_file("team_data_on_register.json")
    else:
        team_data = fetch_from_api(f'https://open.faceit.com/data/v4/teams/{team_id}', write_to_file="team_data_on_register.json")
    
    prev_nicknames = {player.player_name for player in prev_players}

    # Filter new players whose nickname is not in the previous list
    new_players = [
        member for member in team_data.get("members", [])
        if member.get("nickname") not in prev_nicknames
    ]

    for player in new_players:
        player_id = player.get("user_id")
        team_id = team_id
        
        if not player_id or not team_id:
            continue
        
        insert_player(Player(
            player_id_i=str(uuid.uuid4()),
            player_id=player_id,
            team_id=team_id,
            sub_t_id=sub_t_id,
            player_name=player.get("nickname"),
            player_logo=player.get("avatar")
        ))

    return {"team_id" : team.get("team_id")}