import datetime
import json
from pathlib import Path
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import requests
from jose import jwt

from db.users import *
from db.db import *
from db.match.match_model import *
from db.match.match_sql import *
from db.match.match_util import process_matches
from db.team.team_model import *
from db.team.team_sql import *
from db.metadata.metadata_model import *
from db.metadata.metadata_sql import *

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/matches")
def get_matches():
    matches = fetch_all_matches()
    return matches

@app.get("/teams")
def get_matches():
    teams = fetch_all_teams()
    last_update = query_last_update()
    return {"teams": teams, "last_update": last_update}

@app.get("/last_update")
def get_last_update():
    last_update = query_last_update()
    return last_update

@app.get("/refresh")
def refresh_teams():
    process_matches()
    write_metadata("last_refresh", int(datetime.datetime.now().timestamp()))
    return {"teams:": [], "matches": []}

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY not set.")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_minutes: int = 60):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/sign-in")
async def sign_in(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Missing email or password")

    user = get_user_by_email(get_db_connection(), email)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user["user_id"], "email": user["email"]})
    return {"access_token": token}

@app.post("/sign-up")
async def sign_up(request: Request):
    data = await request.json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        raise HTTPException(status_code=400, detail="Missing required fields")

    conn = get_db_connection()

    if user_exists(conn, email):
        raise HTTPException(status_code=400, detail="Email already in use")

    hashed_password = bcrypt.hash(password)
    insert_user(conn, email, hashed_password)

    return JSONResponse(content={"message": "User created successfully"}, status_code=201)