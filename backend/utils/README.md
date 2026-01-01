# Backend Utils

Utility functions for the CrossfireGG backend.

## FACEIT Tournament Data Fetcher

### Setup

Add your FACEIT API key to your environment variables:

```bash
FACEIT_API_KEY=your_api_key_here
```

### Usage

```typescript
import { fetchFaceitTournamentData } from "@backend/utils";

// Basic usage
const data = await fetchFaceitTournamentData({
    championshipId: "f56331e8-131a-4c50-b7db-eec8b010ff98",
    queryParams: {
        limit: 70,
        offset: 0,
    },
});
```

### Debug Options

During development, you can use debug options to avoid hitting the API repeatedly:

**Write to file:**
```typescript
const data = await fetchFaceitTournamentData({
    championshipId: "f56331e8-131a-4c50-b7db-eec8b010ff98",
    queryParams: { limit: 70 },
    debug: {
        writeToFile: true,
        fileName: "my-cache.json",
    },
});
```

**Read from file:**
```typescript
const data = await fetchFaceitTournamentData({
    championshipId: "f56331e8-131a-4c50-b7db-eec8b010ff98",
    debug: {
        readFromFile: true,
        fileName: "my-cache.json",
    },
});
```

Debug files are stored in `backend/debug-data/` (gitignored).

### API Reference

**Parameters:**
- `championshipId` (string): The FACEIT championship/tournament ID
- `queryParams` (object, optional): Query parameters to pass to the API
  - `limit`: Number of results to return
  - `offset`: Pagination offset
  - Any other params supported by FACEIT API
- `debug` (object, optional):
  - `writeToFile` (boolean): Save API response to file
  - `readFromFile` (boolean): Load data from file instead of API
  - `fileName` (string): Custom filename for debug data

**Returns:**
```typescript
{
    items: any[];
    start: number;
    end: number;
}
```

See `fetchFaceitTournamentData.examples.ts` for more usage examples.

