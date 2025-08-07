from fastapi import APIRouter
from bot.bot import bot

router = APIRouter()

@router.get("/send_message")
async def send_message():
    channel = bot.get_channel(1395961770077851822)
    if channel is None:
        return {"detail": "Channel not found"}
    await channel.send("Hello from API!")
    return {"status": "sent"}