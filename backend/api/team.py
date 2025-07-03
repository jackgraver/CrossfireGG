from fastapi import APIRouter, Request

from db.metadata.metadata_sql import query_last_update
from db.team.team_sql import fetch_all_teams, get_team_info, get_team_matches, set_team_joined, set_team_paid

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

@router.post("/paid/{team_id}")
async def team_paid(request: Request, team_id: str):
    data = await request.json()
    paid = data.get("paid")
    return set_team_paid(team_id, paid)

@router.post("/joined/{team_id}")
async def team_joined(request: Request, team_id: str):
    data = await request.json()
    joined = data.get("joined")
    print(joined)
    return set_team_joined(team_id, joined)