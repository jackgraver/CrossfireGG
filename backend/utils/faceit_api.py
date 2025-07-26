import json
import os
from pathlib import Path
import requests

FACEIT_API_KEY = os.getenv("FACEIT_API_KEY")
if not FACEIT_API_KEY:
    raise RuntimeError("FACEIT_API_KEY not set.")

def fetch_from_api(url: str, write_to_file: bool = None) -> dict:
    """
    Fetch data from the Faceit API.
    
    Args:
        url (str): The URL to fetch data from.
        write_to_file (str, optional): The name of the file to write the response to. Defaults to None.
    
    Returns:
        dict: The response data.
    """
    
    if not url:
        return {}
    
    response = requests.get(
        url,
        headers={
            "Authorization": f"Bearer {FACEIT_API_KEY}",
            "Accept": "application/json",
        },
    )
    
    if write_to_file:
        file = Path('.test_data/' + write_to_file)
        with open(file, "w", encoding="utf-8") as f:
            json.dump(response.json(), f, indent=4, default=str)
    
    response.raise_for_status()
    return response.json()

def fetch_from_file(file_name: str) -> dict:
    """
    Fetch data from a file.
    
    Args:
        file_name (str): The name of the file to fetch data from.
    
    Returns:
        dict: The response data.
    """
    if not file_name:
        return {}
    
    file = Path('.test_data/' + file_name)
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)