from shared import bot

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user} (ID: {bot.user.id})")

@bot.command()
async def ping(ctx):
    await ctx.send("Pong!")

# from register import RegisterModal
# import discord
# import json
# import asyncio
# import os
# from discord.ext import commands
# from discord import app_commands
# from dotenv import load_dotenv

# load_dotenv()
# TOKEN = os.getenv("DISCORD_TOKEN")

# intents = discord.Intents.default()
# intents.guilds = True
# intents.guild_messages = True
# intents.message_content = True
# intents.members = True

# bot = commands.Bot(command_prefix="!", intents=intents)

# @bot.event
# async def on_ready():
#     print(f"✅ Bot logged in as {bot.user}")
#     guild = discord.utils.get(bot.guilds, name="bot test")
#     try:
#         synced = await bot.tree.sync()
#         print(f"🔧 Synced {len(synced)} slash commands.")
#     except Exception as e:
#         print(f"Slash sync failed: {e}")

#     # optional: auto-run setup on startup
    
#     # if guild:
#     #     await setup_channels_and_roles(guild)

# async def setup_channels_and_roles(guild: discord.Guild):
#     with open("sample.json", "r") as f:
#         config = json.load(f)

#     for entry in config:
#         channel_name = entry["name"]
#         role_name = entry["role_name"]
#         welcome_message = entry["message"]

#         # Create role if missing
#         role = discord.utils.get(guild.roles, name=role_name)
#         if not role:
#             role = await guild.create_role(name=role_name)
#             print(f"✅ Created role: {role_name}")

#         # Create channel if missing
#         overwrites = {
#             guild.default_role: discord.PermissionOverwrite(read_messages=False),
#             role: discord.PermissionOverwrite(read_messages=True, send_messages=True),
#         }

#         channel = discord.utils.get(guild.text_channels, name=channel_name)
#         if not channel:
#             channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
#             print(f"📺 Created channel: {channel_name}")

#         await channel.send(welcome_message)
#         await asyncio.sleep(1)

# # 🟦 Example Slash Command
# # @bot.tree.command(name="register_message", description="Sends a test embed")
# # async def register_message(interaction: discord.Interaction):
# #     embed = discord.Embed(
# #         title="Secure Your Spot",
# #         description='''
# #             To register, create a ticket with your team details:
# #             5 starters
# #             Team name
# #             Team logo (if available)
# #             Team page link (Faceit)
# #         '''
# # ,
# #         color=discord.Color.blurple()
# #     )
# #     await interaction.response.send_message(embed=embed)

# # Command to trigger modal
# @bot.tree.command(name="register", description="Register your team")
# async def register_command(interaction: discord.Interaction):
#     await interaction.response.send_modal(RegisterModal())


# bot.run(TOKEN)
