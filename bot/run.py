# import asyncio
# from shared import bot
# import uvicorn
# from api import app
# import os
# from dotenv import load_dotenv

# load_dotenv()
# DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

# async def start_fastapi():
#     config = uvicorn.Config(app, host="0.0.0.0", port=8000, log_level="info")
#     server = uvicorn.Server(config)
#     await server.serve()

# async def main():
#     bot_task = asyncio.create_task(bot.start(DISCORD_TOKEN))
#     api_task = asyncio.create_task(start_fastapi())
#     await asyncio.gather(bot_task, api_task)

# if __name__ == "__main__":
#     asyncio.run(main())

import os
import asyncio
from fastapi import FastAPI
from discord.ext import commands
from dotenv import load_dotenv
import discord
from contextlib import asynccontextmanager
import uvicorn

load_dotenv()
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(bot.start(DISCORD_TOKEN))
    yield  # Keep FastAPI running

app = FastAPI(lifespan=lifespan)

@app.get("/")
def root():
    return {"status": "online"}

@app.get("/send_message")
async def send_message():
    channel = bot.get_channel(1395961770077851822)
    if channel is None:
        return {"detail": "Channel not found"}
    await channel.send("Hello from API!")
    return {"status": "sent"}

if __name__ == "__main__":
    uvicorn.run("run:app", host="localhost", port=8000, reload=True)