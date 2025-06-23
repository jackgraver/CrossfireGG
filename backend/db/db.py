from sqlmodel import SQLModel, create_engine

engine = create_engine("sqlite:///oss.db", echo=False)

def get_db_connection():
    init_tables()
    return engine

def init_tables():
    SQLModel.metadata.create_all(engine)