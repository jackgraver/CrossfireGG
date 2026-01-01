# FaceIT Data Import System - Implementation Summary

## Overview
Successfully implemented a complete system to import and transform FaceIT tournament and match data into the database.

## Completed Tasks

### 1. Schema Updates ✅
**Files Modified:**
- `backend/schemas/team.ts` - Updated `team_captain_id` to reference `players.ID` instead of `users.ID`
- `backend/schemas/match.ts` - Added `faceit_id` field for match upserts

**Changes:**
- Teams now have captains that are players (not users), aligning with FaceIT data structure
- Matches can be identified and upserted by their FaceIT match ID

### 2. Data Transformation Utilities ✅
**Files Created:**
- `backend/utils/transformFaceitData.ts`

**Features:**
- Type definitions for FaceIT API responses
- Transformation functions:
  - `transformFaceitTournament()` - Championship → Stage
  - `transformFaceitPlayer()` - FaceIT player → Player
  - `transformFaceitTeam()` - FaceIT faction → Team
  - `transformFaceitMatch()` - FaceIT match → Match
  - `transformFaceitMatchParticipants()` - Match participants
  - `transformFaceitMaps()` - Map results from detailed_results
- Status mapping (FaceIT statuses → database statuses)
- Extraction utilities for players, teams, and groups

### 3. Repository Layer Updates ✅
**Files Created:**
- `backend/modules/players/player.repository.ts`

**Files Modified:**
- `backend/modules/teams/team.repository.ts`
- `backend/modules/tournaments/tournament.repository.ts`
- `backend/modules/matches/match.repository.ts`

**New Methods:**
- **Player Repository:**
  - `findByFaceitId()` - Find player by FaceIT ID
  - `upsertPlayerByFaceitId()` - Insert or update player
  - `updatePlayerTeam()` - Update player's team assignment

- **Team Repository:**
  - `findTeamByFaceitId()` - Find team by FaceIT faction ID
  - `upsertTeamByFaceitId()` - Insert or update team

- **Tournament Repository:**
  - `findStageByFaceitId()` - Find stage by FaceIT championship ID
  - `upsertStageByFaceitId()` - Insert or update stage
  - `upsertGroupByName()` - Insert or update group
  - `upsertStageTeam()` - Link team to stage/group

- **Match Repository:**
  - `findMatchByFaceitId()` - Find match by FaceIT match ID
  - `upsertMatchByFaceitId()` - Insert or update match
  - `upsertMatchParticipant()` - Insert or update match participant
  - `upsertMap()` - Insert or update map result

### 4. Import Service ✅
**Files Created:**
- `backend/modules/tournaments/faceitImport.service.ts`

**Features:**
- `importTournamentData()` - Import FaceIT tournament as a stage
- `importMatchesData()` - Main orchestration function that:
  - Processes all unique players
  - Processes all unique teams
  - Creates groups from match data
  - Imports individual matches
  - Returns detailed import statistics
- `importMatch()` - Import single match with:
  - Match details
  - Participants (both teams)
  - Map results
  - Group assignments

**Processing Order:**
1. Players (by FaceIT player_id)
2. Teams (by FaceIT faction_id, with captain assignment)
3. Stage (by FaceIT championship_id)
4. Groups (extracted from match data)
5. Matches (with all relationships)
6. Match Participants
7. Maps

### 5. API Layer ✅
**Files Modified:**
- `backend/modules/tournaments/tournament.validation.ts`
- `backend/modules/tournaments/tournament.controller.ts`
- `backend/modules/tournaments/tournament.routes.ts`

**New Validation Schemas:**
- `ImportFaceitDataSchema` - Validates API import requests
- `ImportFaceitDataFromFileSchema` - Validates file import requests

**New Controllers:**
- `importFaceitData()` - Import from FaceIT API
- `importFaceitDataFromFile()` - Import from local JSON files

**New Routes:**
- `POST /tournaments/faceit/import` - Import from FaceIT API
- `POST /tournaments/faceit/import-file` - Import from local debug files

## API Usage

### Import from FaceIT API
```bash
POST /tournaments/faceit/import
Content-Type: application/json

{
  "tournamentId": 1,
  "championshipId": "f37a1d7f-dd98-4c2b-97de-c5c4a4d541f3",
  "queryParams": {
    "offset": 0,
    "limit": 100
  }
}
```

### Import from Local File
```bash
POST /tournaments/faceit/import-file
Content-Type: application/json

{
  "tournamentId": 1,
  "fileName": "faceit_matches_regseason.json"
}
```

### Response Format
```json
{
  "success": true,
  "message": "Import completed",
  "stageId": 5,
  "counts": {
    "players": 150,
    "teams": 32,
    "matches": 96,
    "groups": 8
  },
  "errors": []
}
```

## Database Migration Required

⚠️ **IMPORTANT**: You need to generate and run a migration to apply the schema changes:

```bash
cd backend
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations
```

Or use push for development:
```bash
npm run db:push
```

## Data Flow

```
FaceIT API/JSON → Import Service → Transformers → Upsert Logic → Database

1. Extract unique players and teams
2. Upsert all players
3. Upsert all teams (with captain references)
4. Update player team assignments
5. Create/update stage
6. Create groups from match data
7. Register teams in stage
8. Upsert matches with all details
9. Create match participants
10. Create map results
```

## Error Handling

- Graceful error handling with detailed error reporting
- Continues processing even if individual items fail
- Returns list of errors in response
- Comprehensive logging throughout the process

## Key Features

1. **Idempotent Operations**: All upserts use `faceit_id` for deduplication
2. **Relationship Management**: Properly links teams, players, matches, and stages
3. **Status Mapping**: Converts FaceIT statuses to internal status values
4. **Group Extraction**: Automatically creates groups from match data
5. **Comprehensive Logging**: Detailed logs for debugging and monitoring
6. **Validation**: Zod schemas ensure data integrity

## Next Steps

1. Run database migrations to apply schema changes
2. Test import with existing debug files
3. Test import from FaceIT API
4. Monitor logs for any errors during import
5. Verify data integrity in database

## Testing Examples

Using the existing debug files:
```bash
# Import regular season matches
POST /tournaments/faceit/import-file
{
  "tournamentId": 1,
  "fileName": "faceit_matches_regseason.json"
}

# Import playoff matches
POST /tournaments/faceit/import-file
{
  "tournamentId": 1,
  "fileName": "faceit_matches_playoffs.json"
}
```

