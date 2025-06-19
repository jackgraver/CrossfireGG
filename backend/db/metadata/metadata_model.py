from sqlmodel import SQLModel, Field

class Metadata(SQLModel, table=True):
    key: str = Field(primary_key=True)
    value: str