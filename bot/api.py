from fastapi import FastAPI, HTTPException
from shared import bot
import discord

app = FastAPI()

@app.get("/")
def root():
    return {"status": "OK", "message": "Discord bot API is running"}

@app.post("/send-message/")
async def send_message(channel_id: int, message: str):
    channel = bot.get_channel(channel_id)
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    await channel.send(message)
    return {"status": "message sent"}

@app.post("/assign-role/")
async def assign_role(guild_id: int, user_id: int, role_id: int):
    guild = bot.get_guild(guild_id)
    if not guild:
        raise HTTPException(status_code=404, detail="Guild not found")

    member = guild.get_member(user_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    role = guild.get_role(role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    await member.add_roles(role)
    return {"status": "role assigned"}
