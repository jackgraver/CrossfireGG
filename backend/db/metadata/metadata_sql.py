from sqlmodel import Session
from typing import Optional
from db.db import get_db_connection
from db.metadata.metadata_model import Metadata, MetadataUpdate

def write_metadata(key: str, value: str):
    with Session(get_db_connection()) as session:
        existing = session.get(Metadata, key)
        if existing:
            session.add(MetadataUpdate(key=key, old_value=existing.value, new_value=value))
            existing.value = value
        else:
            session.add(Metadata(key=key, value=value))
            session.add(MetadataUpdate(key=key, old_value=None, new_value=value))
        session.commit()
        
def query_last_update() -> Optional[str]:
    with Session(get_db_connection()) as session:
        metadata = session.get(Metadata, "last_refresh")
        return metadata.value if metadata else None

def get_metadata_value(key: str) -> Optional[str]:
    with Session(get_db_connection()) as session:
        metadata = session.get(Metadata, key)
        return metadata.value if metadata else None