import os
from sqlmodel import SQLModel, Session, create_engine, select
from db.user.user_model import Role, User, UserRole

from dotenv import load_dotenv

load_dotenv()

SQLITE_PATH = os.getenv("SQLITE_PATH")
if not SQLITE_PATH:
    raise RuntimeError("SQLITE_PATH not set.")

engine = create_engine(SQLITE_PATH, echo=False)

def get_db_connection():
    init_tables()
    return engine

def init_tables():
    SQLModel.metadata.create_all(engine)
    
def generate_static_data():
    if check_roles_created():
        with Session(engine) as session:    
            admin = Role(role_id=1, role_name='ADMIN')
            production_lead = Role(role_id=2, role_name='PRODUCTION_LEAD')
            production = Role(role_id=3, role_name='PRODUCTION')
            
            session.add(admin)
            session.add(production_lead)
            session.add(production)
            session.commit()
    if check_sudo_role():
        username = os.getenv("SUPER_ADMIN_USERNAME")
        email = os.getenv("SUPER_ADMIN_EMAIL")
        password = os.getenv("SUPER_ADMIN_PASS")
        if username and email and password:
            with Session(engine) as session:    
                sudo = User(user_id='e6148f84-7998-4a98-969b-025699d471f0',
                            user_name=username,
                            email=email,
                            password=password)
            
                session.add(sudo)
                sudo_admin = UserRole(user_id='e6148f84-7998-4a98-969b-025699d471f0', role_id=1)
                sudo_prod_lead = UserRole(user_id='e6148f84-7998-4a98-969b-025699d471f0', role_id=2)
                
                session.add(sudo_admin)
                session.add(sudo_prod_lead)
                session.commit()
        
def check_roles_created() -> bool:
    with Session(engine) as session:
        roles = session.exec(select(Role)).first()
        return roles == None
    
def check_sudo_role() -> bool:
    with Session(engine) as session:
        sudo_user = session.exec(select(User).where(User.user_id == 'e6148f84-7998-4a98-969b-025699d471f0')).first()
        return sudo_user == None