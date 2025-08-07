import discord
from discord.ext import commands

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
        
@bot.tree.command(name="register_message", description="Sends a test embed")
async def register_message(interaction: discord.Interaction):
    print('rec reg msg')
    embed = discord.Embed(
        title="Secure Your Spot",
        description='''
            To register, create a ticket with your team details:
            5 starters
            Team name
            Team logo (if available)
            Team page link (Faceit)
        '''
    ,
        color=discord.Color.blurple()
    )
    await interaction.response.send_message(embed=embed)