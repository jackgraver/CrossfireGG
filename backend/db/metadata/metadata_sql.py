from sqlmodel import Session
from typing import Optional
from db.db import get_db_connection
from db.metadata.metadata_model import Metadata

def write_metadata(key: str, value: str):
    with Session(get_db_connection()) as session:
        existing = session.get(Metadata, key)
        if existing:
            existing.value = value
        else:
            session.add(Metadata(key=key, value=value))
        session.commit()
        
def query_last_update() -> Optional[str]:
    with Session(get_db_connection()) as session:
        metadata = session.get(Metadata, "last_refresh")
        return metadata.value if metadata else None

def get_metadata_value(key: str) -> Optional[str]:
    with Session(get_db_connection()) as session:
        metadata = session.get(Metadata, key)
        return metadata.value if metadata else None