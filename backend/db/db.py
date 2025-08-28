import os
from sqlmodel import SQLModel, create_engine

from dotenv import load_dotenv

load_dotenv()

SQLITE_PATH = os.getenv("SQLITE_PATH")

engine = create_engine(SQLITE_PATH, echo=False)

def get_db_connection():
    init_tables()
    return engine

def init_tables():
    SQLModel.metadata.create_all(engine)