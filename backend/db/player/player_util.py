import os
from dotenv import load_dotenv
import requests

load_dotenv()

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")

def fetch_faceit_info(player_name: str):
    try:
        
        response = requests.get(
            f'https://open.faceit.com/data/v4/players?nickname={player_name}',
            headers={
                "Authorization": f"Bearer {FACEIT_API_KEY}",
                "Accept": "application/json",
            },
        )
        response.raise_for_status()
        id = response.json().get("player_id")
        return id
    except Exception as e:
        return None