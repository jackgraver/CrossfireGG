import discord
import json
import asyncio
from discord.ext import commands
from dotenv import load_dotenv
import os

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
intents.guilds = True
intents.guild_messages = True
intents.message_content = True  # required to read messages
intents.members = True  # required to manage roles

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"Bot logged in as {bot.user}")

    # You can trigger creation with a command, but this just runs once on ready
    guild = discord.utils.get(bot.guilds, name="bot test")
    if not guild:
        print("Guild not found.")
        return

    await setup_channels_and_roles(guild)

async def setup_channels_and_roles(guild: discord.Guild):
    with open("sample.json", "r") as f:
        config = json.load(f)

    for entry in config:
        channel_name = entry["name"]
        role_name = entry["role_name"]
        welcome_message = entry["message"]

        # Create role if not exists
        role = discord.utils.get(guild.roles, name=role_name)
        if not role:
            role = await guild.create_role(name=role_name)
            print(f"Created role: {role_name}")

        # Create channel with role-specific permissions
        overwrites = {
            guild.default_role: discord.PermissionOverwrite(read_messages=False),
            role: discord.PermissionOverwrite(read_messages=True, send_messages=True)
        }

        channel = discord.utils.get(guild.text_channels, name=channel_name)
        if not channel:
            channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
            print(f"Created channel: {channel_name}")

        await channel.send(welcome_message)
        await asyncio.sleep(1)  # Slight delay to avoid rate limits

bot.run(TOKEN)
