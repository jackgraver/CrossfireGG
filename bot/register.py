import base64
import discord
from discord import app_commands
from discord.ext import commands
import aiohttp

class RegisterModal(discord.ui.Modal, title="Team Registration"):
    team_name = discord.ui.TextInput(
        label="Team Name",
        placeholder="Your team's name",
        required=True,
        max_length=100
    )
    faceit_link = discord.ui.TextInput(
        label="Team Page Link (Faceit)",
        placeholder="https://www.faceit.com/en/teams/xxx",
        required=True,
        style=discord.TextStyle.short
    )
    starters = discord.ui.TextInput(
        label="Player Names (Case Sensitive)",
        placeholder="One per line:\nPlayer1\nPlayer2\nPlayer3\nPlayer4\nPlayer5",
        required=True,
        style=discord.TextStyle.paragraph,
        max_length=500
    )


    async def download_image_as_base64(self, url: str) -> str | None:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    if resp.status == 200:
                        img_bytes = await resp.read()
                        return f"data:image/png;base64,{base64.b64encode(img_bytes).decode()}"
        except Exception as e:
            print(f"Failed to fetch image: {e}")
        return None

    """
https://www.faceit.com/en/teams/1933f0c2-c4fd-4e84-9d70-4b157317d3f2

kilo
duw
montocore
snooplez
bubagumpy
    """
    async def on_submit(self, interaction: discord.Interaction):
        # Prepare the data dictionary
        # data = {
        #     "team_name": self.team_name.value,
        #     "faceit_link": self.faceit_link.value,
        #     "starters": [s.strip() for s in self.starters.value.splitlines() if s.strip()]
        # }

        # data = {
        #     "team_name": "kav and friends",
        #     "faceit_link": "https://www.faceit.com/en/teams/1933f0c2-c4fd-4e84-9d70-4b157317d3f2",
        #     "starters": """kilo
        #                     duw
        #                     montocore
        #                     snooplez
        #                     bubagumpy"""
        # }
        data = {
            "team_name": "drugs n pugs",
            "faceit_link": "https://www.faceit.com/en/teams/a4b1806e-9cd9-4ffb-95a6-ca0e7a26b6fb",
            "starters": """absolut-
                            jBREEEZY
                            Sunk_
                            s3rum_
                            LUKE4k"""
        }

        api_url = "http://localhost:8000/team/register"  # Replace with your actual API URL

        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=data) as resp:
                print(f"Response status: {resp.status}")
                if resp.status == 200:
                    response_json = await resp.json()
                    team_logo = None
                    if response_json.get("team_logo"):
                        team_logo = await self.download_image_as_base64(response_json.get("team_logo"))
                    
                    guild = interaction.guild
                    member = interaction.user
                    
                    # Check if role exists
                    role = discord.utils.get(guild.roles, name=data["team_name"])
                    if not role:
                        if team_logo:
                            print(team_logo)
                            role = await guild.create_role(name=data["team_name"], icon=team_logo)
                        else: 
                            role = await guild.create_role(name=data["team_name"])
                    
                    # Add role to member
                    await member.add_roles(role, reason="Team registered via bot")
                    
                    # Create channel overwrites: only the new role can view/send
                    overwrites = {
                        guild.default_role: discord.PermissionOverwrite(read_messages=False),
                        role: discord.PermissionOverwrite(read_messages=True, send_messages=True)
                    }
                    
                    # Create channel named after team (sanitize if needed)
                    channel_name = data["team_name"].lower().replace(" ", "-")
                    existing_channel = discord.utils.get(guild.text_channels, name=channel_name)
                    if not existing_channel:
                        channel = await guild.create_text_channel(channel_name, overwrites=overwrites)
                    else:
                        channel = existing_channel
                    
                    # Send a welcome message mentioning the role
                    await channel.send(f"Welcome {role.mention}! This channel is reserved for your team.")
                    
                    # Confirm to user
                    await interaction.response.send_message(
                        f"✅ Team registered successfully!\nTeam: **{data['team_name']}**\n"
                        f"Role and channel created and you have been added to the role.",
                        ephemeral=True
                    )
                else:
                    await interaction.response.send_message(
                        f"❌ Failed to register team. Server responded with status {resp.status}.",
                        ephemeral=True
                    )
