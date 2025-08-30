import asyncio
from datetime import datetime
import json

import pytz
import discord
from discord.ext import commands

from db.team.team_sql import get_team_info, get_team_names

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ Bot logged in as {bot.user}")
    guild = discord.utils.get(bot.guilds, name="bot test")
    try:
        synced = await bot.tree.sync()
        print(f"🔧 Synced {len(synced)} slash commands.")
    except Exception as e:
        print(f"Slash sync failed: {e}")

@bot.tree.command(name="create_channels", description="Creates channels for teams")
async def create_channels(interaction: discord.Interaction):
    await interaction.response.defer()  # Acknowledge the command quickly
    await setup_match_channels(interaction.guild)
    await interaction.followup.send("✅ Channels set up!")

async def delete_channels():
    guild = bot.get_guild(1395961770077851819)
    if guild is None:
        # bot may not be ready yet, or not in that guild
        guild = await bot.fetch_guild(1395961770077851819)
    
    for channel in guild.text_channels:
        if channel.name != "general":
            try:
                await channel.delete()
                print(f"Deleted {channel.name}")
            except Exception as e:
                print(f"Failed to delete {channel.name}: {e}")
    channel = discord.utils.get(guild.text_channels, name="general")
    await channel.send("Finished deleting channels.")

def format_unix_to_eastern(unix_timestamp):
    """Convert Unix timestamp to Eastern timezone string"""
    if not unix_timestamp:
        return "TBD"
    
    # Convert Unix timestamp to datetime
    dt = datetime.fromtimestamp(unix_timestamp)
    
    # Convert to Eastern timezone
    eastern_tz = pytz.timezone('US/Eastern')
    eastern_time = dt.astimezone(eastern_tz)
    
    # Format as readable string
    return eastern_time.strftime("%B %d, %Y at %I:%M %p ET")

async def setup_match_channels(matches = None, delete=False, create_roles=False):    
    if delete:
        await delete_channels()
        return;
    
    guild = bot.get_guild(1395961770077851819)
    if guild is None:
        # bot may not be ready yet, or not in that guild
        guild = await bot.fetch_guild(1395961770077851819)
        
    if not matches:
        try:
            with open(".test_data/sample_bot_matches.json", "r") as f:
                matches = json.load(f)
        except Exception as e:
            print(f"Error loading match data: {e}")
            return

    try:
        for match in matches:
            team1 = get_team_info(match.get("team1_id"))
            team2 = get_team_info(match.get("team2_id"))
            
            if not team1 or not team2:
                continue
            
            team1_name = team1.team_name
            team2_name = team2.team_name
            channel_name = f"{team1_name}-vs-{team2_name}".lower().replace(" ", "-")
            
            role1 = discord.utils.get(guild.roles, name=team1_name)
            role2 = discord.utils.get(guild.roles, name=team2_name)

            if not role1:
                if create_roles:
                    role1 = await guild.create_role(name=team1_name, reason="Created by bot")
                continue
            if not role2:
                if create_roles:
                    role2 = await guild.create_role(name=team2_name, reason="Created by bot")
                continue

            overwrites = {
                guild.default_role: discord.PermissionOverwrite(read_messages=False),
                role1: discord.PermissionOverwrite(read_messages=True, send_messages=True),
                role2: discord.PermissionOverwrite(read_messages=True, send_messages=True),
            }

            channel = discord.utils.get(guild.text_channels, name=channel_name)
            if not channel:
                channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
            else:
                return;

            formatted_date = format_unix_to_eastern(match.get('date'))
            round_str = match.get('round')
            try:
                if isinstance(round_str, str) and '-' in round_str:
                    parts = round_str.split('-')
                    round_num = int(parts[0]) + int(parts[1])
                else:
                    round_num = int(round_str)
            except Exception:
                round_num = round_str

            welcome_message = f"{role1.mention} {role2.mention}\n\nWelcome to round {round_num + 1}! Your match is scheduled for {formatted_date}. Good luck to both teams!"
            await channel.send(welcome_message)

            await asyncio.sleep(1)
    except Exception as e:
        print(f"Error setting up channels: {e}")
        
async def setup_team_channel(team = None):
    guild = bot.get_guild(1395961770077851819)
    if guild is None:
        guild = await bot.fetch_guild(1395961770077851819)
        
    if not team:
        return

    try:
        channel_name = team.team_name
        
        role1 = discord.utils.get(guild.roles, name=team.team_name)

        if not role1:
            print("Failed to find role", team.team_name)
            return

        overwrites = {
            guild.default_role: discord.PermissionOverwrite(read_messages=False),
            role1: discord.PermissionOverwrite(read_messages=True, send_messages=True),
        }

        channel = discord.utils.get(guild.text_channels, name=channel_name)
        if not channel:
            channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
        else:
            return;

        welcome_message = f"{role1.mention} Please use this channel to communicate with the admin team."
        await channel.send(welcome_message)

        await asyncio.sleep(1)  
    except Exception as e:
        print(f"Error setting up channels: {e}")

@bot.tree.command(name="embeded_message", description="Sends a test embed")
async def register_message(interaction: discord.Interaction):
    await interaction.response.send_modal(RegisterModal())

class RegisterModal(discord.ui.Modal, title="Create Embed"):
    e_title = discord.ui.TextInput(
        label="Message Title",
        required=True,
        style=discord.TextStyle.short,
        max_length=100,
    )
    body = discord.ui.TextInput(
        label="Message Body",
        required=True,
        style=discord.TextStyle.paragraph,
        max_length=1000,
    )

    async def on_submit(self, interaction: discord.Interaction):
        data = {
            "title": self.e_title.value,
            "body": self.body.value,
        }
        embed = discord.Embed(
            title=data["title"],
            description=data["body"],
            color=discord.Color.blurple()
        )
        await interaction.response.send_message(embed=embed)
        
        
        
# ALLOWED_ROLE_NAMES = ["drugsnpugs", "incontrol", "omen"]

class TeamRoleSelect(discord.ui.Select):
    def __init__(self, roles: list[discord.Role]):
        options = [
            discord.SelectOption(label=role.name, value=str(role.id))
            for role in roles
        ]
        super().__init__(placeholder="Select your team...", options=options)

    async def callback(self, interaction: discord.Interaction):
        role_id = int(self.values[0])
        role = interaction.guild.get_role(role_id)
        if role:
            await interaction.user.add_roles(role)
            await interaction.response.send_message(f"✅ You have been given the role: **{role.name}**", ephemeral=True)
        else:
            await interaction.response.send_message("⚠️ That role could not be found.", ephemeral=True)

class TeamRoleView(discord.ui.View):
    def __init__(self, roles: list[discord.Role]):
        super().__init__(timeout=60)  # Dropdown disappears after 60s
        self.add_item(TeamRoleSelect(roles))


@bot.tree.command(name="get_team_role", description="Request a team role")
async def get_team_role(interaction: discord.Interaction):
    ALLOWED_ROLE_NAMES = get_team_names()
    guild_roles = [role for role in interaction.guild.roles if role.name in ALLOWED_ROLE_NAMES]

    if not guild_roles:
        await interaction.response.send_message("⚠️ No allowed team roles found on this server.", ephemeral=True)
        return

    await interaction.response.send_message(
        "Please select your team role:",
        view=TeamRoleView(guild_roles),
        ephemeral=True
    )