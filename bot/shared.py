import os
from dotenv import load_dotenv
import discord
from discord.ext import commands


intents = discord.Intents.default()
intents.guilds = True
intents.guild_messages = True
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

# bot.run(TOKEN)
