from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

from db.metadata.metadata_sql import get_metadata_value, query_last_update, write_metadata

router = APIRouter()


from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
async def get_auth_user(token: str = Depends(oauth2_scheme)):
    # validate token here
    if not token or token == "bad":
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

@router.get("/last_update")
def get_last_update():
    last_update = query_last_update()
    return last_update


@router.get("/current_stage")
async def current_stage():
    return get_metadata_value("current_stage")


@router.post("/toggle_stage")
async def toggle_stage(current_user: str = Depends(get_auth_user)):
    """
    Toggle the current stage between 'REGULAR SEASON' and 'PLAYOFFS'
    """
    if not current_user:
        raise {} # TODO: Return error
    
    current_stage = get_metadata_value("current_stage")
    
    if current_stage == "REGULAR SEASON":
        new_stage = "PLAYOFFS"
    elif current_stage == "PLAYOFFS":
        new_stage = "REGULAR SEASON"
    else:
        # If current_stage is not set or is something else, default to REGULAR SEASON
        new_stage = "REGULAR SEASON"    
    
    write_metadata("current_stage", new_stage)
    
    return JSONResponse(
        content={
            "message": f"Stage switched to {new_stage}",
            "previous_stage": current_stage,
            "current_stage": new_stage
        }, 
        status_code=200
    )