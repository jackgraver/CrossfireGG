from sqlmodel import Session, select
from db.db import get_db_connection
from db.player.player_model import Player, PlayerStats
from db.team.team_model import Team
from db.match.match_model import Map, Match

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
        match = session.exec(select(Match).where(Match.match_id == match_id)).first()
        team1 = session.exec(select(Team).where(Team.team_id == match.team1_id)).first()
        team2 = session.exec(select(Team).where(Team.team_id == match.team2_id)).first()
        
        maps = (
            session.exec(select(Map).where(Map.match_id == match_id))
            .all()
        )
        
        map_data = []
        for map_ in maps:
            # Get all PlayerStats for the map
            query = (
                select(PlayerStats, Player, Team)
                .join(Player, PlayerStats.player_id == Player.player_id)
                .join(Team, Player.team_id == Team.team_id)
                .where(PlayerStats.map_id == map_.map_id)
            )
            results = session.exec(query).all()
            
            # Group by team
            teams = {}
            for ps, player, team in results:
                teams.setdefault(team.team_id, {
                    "team_id": team.team_id,
                    "team_name": team.team_name,
                    "team_logo": team.team_logo,
                    "players": []
                })
                teams[team.team_id]["players"].append({
                    "player_id": player.player_id,
                    "player_name": player.player_name,
                    "player_logo": player.player_logo,
                    "stats": {
                        "kills": ps.kills,
                        "deaths": ps.deaths,
                        "assists": ps.assists,
                        "adr": ps.adr,
                        "damage": ps.damage,
                    }
                })

            map_data.append({
                "map_id": map_.map_id,
                "match_id": map_.match_id,
                "map_name": map_.map_name,
                "round": map_.round,
                "winner_id": map_.winner_id,
                "team1_score": map_.team1_score,
                "team2_score": map_.team2_score,
                "teams": list(teams.values())
            })

        return {
            "match_info": { 
                "match_id": match.match_id,
                "sub_t_id": match.sub_t_id,
                "status": match.status,
                "scheduled_at": match.scheduled_at,
                "round": match.round,
                "faceit_url": match.faceit_url,
                "winner": match.winner,
                "teams": {
                    "team1": {
                        "team_id": team1.team_id, 
                        "team_name": team1.team_name, 
                        "team_logo": team1.team_logo,
                        "seed": team1.seed,
                        "win": team1.win,
                        "loss": team1.loss,
                        "paid": team1.paid,
                        "joined_tournament": team1.joined_tournament,
                    },
                    "team2": {
                        "team_id": team2.team_id, 
                        "team_name": team2.team_name, 
                        "team_logo": team2.team_logo,
                        "seed": team2.seed,
                        "win": team2.win,
                        "loss": team2.loss,
                        "paid": team2.paid,
                        "joined_tournament": team2.joined_tournament,
                    },
                },
                "team1_score": match.team1_score,
                "team2_score": match.team2_score,
            },
            "maps": map_data
    }
    
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
    
def check_player_exists(player_name: str):
    """_summary_

    Args:
        player_name (str): _description_

    Returns:
        int, int, str: player_id_i, team_id, team_name
    """
    with Session(get_db_connection()) as session:
        player = session.exec(select(Player).where(Player.player_name == player_name)).first()
        
        if player:
            team = session.exec(select(Team).where(Team.team_id == player.team_id)).first()
            if team:
                return player.player_id_i, team.team_id, team.team_name
    return None, None, None