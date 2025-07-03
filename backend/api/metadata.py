from fastapi import APIRouter
from fastapi.responses import JSONResponse

from db.metadata.metadata_sql import get_metadata_value, query_last_update, write_metadata

router = APIRouter()

@router.get("/last_update")
def get_last_update():
    last_update = query_last_update()
    return last_update


@router.get("/current_stage")
async def current_stage():
    return get_metadata_value("current_stage")


@router.post("/toggle_stage")
async def toggle_stage():
    """
    Toggle the current stage between 'REGULAR SEASON' and 'PLAYOFFS'
    """
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