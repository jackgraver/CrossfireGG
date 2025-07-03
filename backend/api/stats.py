from fastapi import APIRouter

from db.player.player_sql import get_all_player_stats, get_player_stats_by_match_id

router = APIRouter()

@router.get("/")
def get_stats():
    res = get_all_player_stats()
    return res

@router.get("/{match_id}")
def get_stats_by_match_id(match_id: str):
    res = get_player_stats_by_match_id(match_id)
    return res