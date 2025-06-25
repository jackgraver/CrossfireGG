from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Metadata(SQLModel, table=True):
    key: str = Field(primary_key=True)
    value: str
    
class MetadataUpdate(SQLModel, table=True):
    __tablename__ = "metadata_update"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    key: str = Field(index=True)
    old_value: Optional[str] = None
    new_value: str
    timestamp: int = Field(default_factory=lambda: int(datetime.now().timestamp()))