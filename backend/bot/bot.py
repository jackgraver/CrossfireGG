import asyncio
import json
import discord
from discord.ext import commands

from db.team.team_sql import get_team_info

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

async def setup_match_channels(guild: discord.Guild, matches = None):
    if not matches:
        try:
            with open(".test_data/sample_bot_matches.json", "r") as f:
                config = json.load(f)
        except Exception as e:
            print(f"Error loading match data: {e}")
            return
    else:
        config = matches

    try:
        for entry in config:
            team1 = get_team_info(entry["team1_id"])
            team2 = get_team_info(entry["team2_id"])
            
            if not team1 or not team2:
                continue
            
            team1_name = team1.team_name
            team2_name = team2.team_name
            channel_name = f"{team1_name}-vs-{team2_name}".lower().replace(" ", "-")

            # Find or create roles
            role1 = discord.utils.get(guild.roles, name=team1_name)
            role2 = discord.utils.get(guild.roles, name=team2_name)

            if not role1:
                print(f"⚠️ Role not found: {team1_name}")
                continue
            if not role2:
                print(f"⚠️ Role not found: {team2_name}")
                continue

            # Set channel permissions
            overwrites = {
                guild.default_role: discord.PermissionOverwrite(read_messages=False),
                role1: discord.PermissionOverwrite(read_messages=True, send_messages=True),
                role2: discord.PermissionOverwrite(read_messages=True, send_messages=True),
            }

            # Create the channel if it doesn’t exist
            channel = discord.utils.get(guild.text_channels, name=channel_name)
            if not channel:
                channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
                print(f"📺 Created channel: {channel_name}")

            # Send welcome message, tagging roles
            welcome_message = f"{role1.mention} {role2.mention}\n\nWelcome to the match page!"
            await channel.send(welcome_message)

            await asyncio.sleep(1)  # Prevent rate limits 
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