from sqlmodel import Session, select
from db.db import get_db_connection
from player.player_model import Player, PlayerStats

def get_all_players(): 
    with Session(get_db_connection()) as session:
        players = session.exec(select(Player)).all()
        return players

def get_all_player_stats():
    with Session(get_db_connection()) as session:
        player_stats = session.exec(select(PlayerStats)).all()
        return player_stats

def get_player_stats_by_match_id(match_id: str):
    with Session(get_db_connection()) as session:
        results = session.exec(
            select(PlayerStats, Player)
            .join(Player, PlayerStats.player_id == Player.player_id)
            .where(PlayerStats.match_id == match_id)
        ).all()
        
        # Convert to serializable dictionaries
        serializable_results = []
        for player_stats, player in results:
            stats_dict = player_stats.model_dump()
            player_dict = player.model_dump()
            # Combine the data
            combined = {**stats_dict, "player_name": player_dict.get("player_name", "Unknown")}
            serializable_results.append(combined)
        
        return serializable_results
    
def get_player_by_id(player_id: str):
    with Session(get_db_connection()) as session:
        player = session.exec(select(Player).where(Player.player_id == player_id)).first()
        return player
    
def insert_player(player: Player):
    with Session(get_db_connection()) as session:
        session.add(player)
        session.commit()
        session.refresh(player)
        return player

def insert_player_stats(player_stats: PlayerStats):
    with Session(get_db_connection()) as session:
        session.add(player_stats)
        session.commit()
        session.refresh(player_stats)
        return player_stats