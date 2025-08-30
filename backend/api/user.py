from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import JSONResponse

from api.auth import get_auth_user
from utils.user_utils import create_access_token
from db.player.player_sql import check_player_exists
from db.player.player_util import fetch_faceit_info
from db.user.user_sql import fetch_all_users, get_user_by_email, get_user_by_id, get_user_roles, hash_password, insert_user, user_exists, verify_password

router = APIRouter()

@router.get("/user-role")
async def get_user_role(user: str = Depends(get_auth_user)):
    roles = get_user_roles(user)
    user = get_user_by_id(user)
    return {"user_id": user, "user_name": user.user_name, "roles": roles}

@router.post("/sign-in")
async def sign_in(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Missing email or password")

    user = get_user_by_email(email)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user["user_id"], "roles": user["roles"], "email": user["email"]})
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        # secure=False,
        samesite="none",
        # samesite="lax",
        max_age=3600,
        path="/"
    )
    
    return response

@router.post("/sign-up")
async def sign_up(request: Request):
    data = await request.json()
    try:
        id = data.get("id")
        email = data.get("email")
        username = data.get("username")
        faceit_id = data.get("faceit_id")
        team_id = data.get("team_id")
        password = data.get("password")
    except:
        id = None
        faceit_id = None
        team_id = None

    if not email or not username or not password:
        print('fail 1')
        raise HTTPException(status_code=400, detail="Missing required fields")

    if user_exists(email):
        print('fail 2')
        raise HTTPException(status_code=400, detail="Email already in use")

    hashed_password = hash_password(password)
    user_id = insert_user(id, email, faceit_id, team_id, hashed_password)

    token = create_access_token({"user_id": user_id, "roles": [], "email": email})
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=3600,
        path="/"
    )
    return response

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "Logged out"}

@router.get("/test_faceit_link/{name}")
async def test_faceit_link(name: str):
    if not name:    
        return {"id": None}
    
    if (id := fetch_faceit_info(name)):
        internal_id, team_id, team_name = check_player_exists(name)
        if internal_id and team_id and team_name:
            return {"player": {"i_id": internal_id, "id": id}, 
                    "team": {"id": team_id, "name": team_name}}
        else:
            return {"player": {"i_id": id, "id": None}, "team": None}
    return {"player": {"i_id": None, "id": None}, "team": None}


@router.get("/all")
def get_all_users():
    users = fetch_all_users()
    return users