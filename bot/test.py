import asyncio
import aiohttp

async def f():
    data = {
        "team_name": "kav and friends",
        "faceit_link": "https://www.faceit.com/en/teams/1933f0c2-c4fd-4e84-9d70-4b157317d3f2",
        "starters": ["kil0", "duw", "m0nt0c0re", "Snooplez", "Bubagumpy"]
    }

    api_url = "http://localhost:8000/team/register"  # Replace with your actual API URL

    async with aiohttp.ClientSession() as session:
        async with session.post(api_url, json=data) as resp: 
            print(f"Response status: {resp.status}")
            if resp.status == 200:
                response_json = await resp.json()
                print(response_json)
            else:
                print(f"Failed to register team. Server responded with status {resp.status}.")

# Run it
if __name__ == "__main__":
    asyncio.run(f())