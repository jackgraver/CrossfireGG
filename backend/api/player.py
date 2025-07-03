from fastapi import APIRouter

from db.player.player_sql import get_all_players

router = APIRouter()

@router.get("/players")
def get_players():
    res = get_all_players()
    return res