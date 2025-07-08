from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from api.auth import has_token

from .user import router as user_router
from .match import router as match_router
from .team import router as team_router
from .metadata import router as metadata_router
from .tournament import router as tournament_router 
from .stats import router as stats_router

import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173", "https://www.osscs.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global middleware
@app.middleware("http")
async def global_wrapper(request: Request, call_next):
    await asyncio.sleep(0)
    return await call_next(request)

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(match_router, prefix="/match", tags=["Match"], dependencies=[Depends(has_token)])
app.include_router(team_router, prefix="/team", tags=["Team"], dependencies=[Depends(has_token)])
app.include_router(metadata_router, prefix="/metadata", tags=["Metadata"], dependencies=[Depends(has_token)])
app.include_router(tournament_router, prefix="/tournament", tags=["Tournament"], dependencies=[Depends(has_token)])
app.include_router(stats_router, prefix="/stats", tags=["Stats"], dependencies=[Depends(has_token)])