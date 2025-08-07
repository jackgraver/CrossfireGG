import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Request
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from api.auth import verify_api_key, verify_bot_token

from .user import router as user_router
from .match import router as match_router
from .team import router as team_router
from .metadata import router as metadata_router
from .tournament import router as tournament_router
from .stats import router as stats_router
from bot.api import router as bot_router

import asyncio

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

from bot.bot import bot

@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(bot.start(DISCORD_TOKEN))
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173", "https://www.osscs.net", "https://osscs.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global middleware
@app.middleware("http")
async def global_wrapper(request: Request, call_next):
    await asyncio.sleep(0)
    return await call_next(request)

app.include_router(user_router, prefix="/user", tags=["User"], dependencies=[Depends(verify_api_key)])
app.include_router(match_router, prefix="/match", tags=["Match"], dependencies=[Depends(verify_api_key)])
app.include_router(team_router, prefix="/team", tags=["Team"], dependencies=[Depends(verify_api_key)])
app.include_router(metadata_router, prefix="/metadata", tags=["Metadata"], dependencies=[Depends(verify_api_key)])
app.include_router(tournament_router, prefix="/tournament", tags=["Tournament"], dependencies=[Depends(verify_api_key)])
app.include_router(stats_router, prefix="/stats", tags=["Stats"], dependencies=[Depends(verify_api_key)])
app.include_router(bot_router, prefix="/bot", tags=["Bot"], dependencies=[Depends(verify_bot_token)])