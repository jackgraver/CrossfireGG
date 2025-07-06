from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Metadata(SQLModel, table=True):
    """
    key: str - primary key <br>
    value: str <br>
    """
    key: str = Field(primary_key=True)
    value: str
    
class MetadataUpdate(SQLModel, table=True):
    """
    id: int - primary key <br>
    key: str <br>
    old_value: str <br>
    new_value: str <br>
    timestamp: int <br>
    """
    __tablename__ = "metadata_update"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    key: str = Field(index=True)
    old_value: Optional[str] = None
    new_value: str
    timestamp: int = Field(default_factory=lambda: int(datetime.now().timestamp()))