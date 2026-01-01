import { faker } from "@faker-js/faker";
import { db } from "../config/database";
import {
    users,
    roles,
    userRoles,
    teams,
    players,
    playerStats,
    tournaments,
    stages,
    stageFormats,
    groups,
    stageTeams,
    matches,
    matchParticipants,
    maps,
    matchCasters,
} from "../schemas";
import { eq, and, isNull } from "drizzle-orm";

interface SeedData {
    roles: Array<{ ID: number }>;
    stageFormats: Array<{ ID: number; format: string }>;
    users: Array<{ ID: number }>;
    teams: Array<{ ID: number; team_captain_id: number }>;
    tournaments: Array<{ ID: number }>;
    stages: Array<{
        ID: number;
        tournament_id: number;
        format_id: number | null;
    }>;
    groups: Array<{ ID: number; stage_id: number }>;
    players: Array<{
        ID: number;
        team_id: number | null;
        user_id: number | null;
    }>;
    matches: Array<{
        ID: number;
        group_id: number | null;
        stage_id: number | null;
        status: string | null;
    }>;
    matchParticipants: Array<{ ID: number; match_id: number; team_id: number; position: number }>;
    maps: Array<{ ID: number; match_id: number; winner_id: number | null }>;
}

const seedData: SeedData = {
    roles: [],
    stageFormats: [],
    users: [],
    teams: [],
    tournaments: [],
    stages: [],
    groups: [],
    players: [],
    matches: [],
    matchParticipants: [],
    maps: [],
};

async function clearDatabase() {
    console.log("Clearing existing data...");
    await db.delete(playerStats);
    await db.delete(matchCasters);
    await db.delete(maps);
    await db.delete(matchParticipants);
    await db.delete(matches);
    await db.delete(stageTeams);
    await db.delete(groups);
    await db.delete(stages);
    await db.delete(tournaments);
    await db.delete(players);
    await db.delete(teams);
    await db.delete(userRoles);
    await db.delete(users);
    await db.delete(roles);
    await db.delete(stageFormats);
    console.log("Database cleared.");
}

function hashPassword(password: string): string {
    const bcrypt = require("bcrypt");
    return bcrypt.hashSync(password, 10);
}

async function seedRoles() {
    console.log("Seeding roles...");
    const roleNames = ["admin", "user", "caster"];
    for (const name of roleNames) {
        const [role] = await db
            .insert(roles)
            .values({
                name,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({ ID: roles.ID });
        seedData.roles.push(role);
    }
    console.log(`Created ${seedData.roles.length} roles`);
}

async function seedStageFormats() {
    console.log("Seeding stage formats...");
    const formatNames = [
        "groups",
        "single elimination",
        "double elimination",
        "round robin",
    ];
    for (const format of formatNames) {
        const [formatRecord] = await db
            .insert(stageFormats)
            .values({ name: format })
            .returning({ ID: stageFormats.ID, format: stageFormats.name });
        seedData.stageFormats.push(formatRecord);
    }
    console.log(`Created ${seedData.stageFormats.length} stage formats`);
}

async function seedUsers() {
    console.log("Seeding users...");
    const userCount = faker.number.int({ min: 20, max: 30 });
    for (let i = 0; i < userCount; i++) {
        const [user] = await db
            .insert(users)
            .values({
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                password: hashPassword("password123"),
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({ ID: users.ID });
        seedData.users.push(user);
    }
    console.log(`Created ${seedData.users.length} users`);
}

async function seedTeams() {
    console.log("Seeding teams...");
    const teamCount = faker.number.int({ min: 5, max: 10 });
    const captainIds = faker.helpers.arrayElements(
        seedData.users.map((u) => u.ID),
        teamCount
    );
    for (let i = 0; i < teamCount; i++) {
        const [team] = await db
            .insert(teams)
            .values({
                name: faker.company.name() + " Gaming",
                team_logo: null,
                faceit_id: faker.string.alphanumeric(10),
                team_captain_id: captainIds[i],
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({
                ID: teams.ID,
                team_captain_id: teams.team_captain_id,
            });
        seedData.teams.push(team);
    }
    console.log(`Created ${seedData.teams.length} teams`);
}

async function linkUsersToTeams() {
    console.log("Note: Users are no longer directly linked to teams via user.team_id");
    console.log("Team membership is now handled through the players table");
}

async function seedTournaments() {
    console.log("Seeding tournaments...");
    const tournamentCount = faker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < tournamentCount; i++) {
        const startDate = faker.date.future();
        const endDate = new Date(startDate);
        endDate.setDate(
            endDate.getDate() + faker.number.int({ min: 14, max: 30 })
        );
        const [tournament] = await db
            .insert(tournaments)
            .values({
                name: faker.company.name() + " Championship",
                start_date: startDate,
                end_date: endDate,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({ ID: tournaments.ID });
        seedData.tournaments.push(tournament);
    }
    console.log(`Created ${seedData.tournaments.length} tournaments`);
}

async function seedStages() {
    console.log("Seeding stages...");
    for (const tournament of seedData.tournaments) {
        const stageCount = faker.number.int({ min: 2, max: 3 });
        for (let i = 0; i < stageCount; i++) {
            const formatId = faker.helpers.arrayElement(
                seedData.stageFormats
            ).ID;
            const startDate = faker.date.future();
            const endDate = new Date(startDate);
            endDate.setDate(
                endDate.getDate() + faker.number.int({ min: 7, max: 14 })
            );
            const [stage] = await db
                .insert(stages)
                .values({
                    tournament_id: tournament.ID,
                    name:
                        i === 0
                            ? "Group Stage"
                            : i === 1
                            ? "Playoffs"
                            : "Finals",
                    faceit_id: faker.string.alphanumeric(10),
                    max_teams: faker.number.int({ min: 8, max: 32 }),
                    format_id: formatId,
                    is_current: i === 0,
                    start_date: startDate,
                    end_date: endDate,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning({
                    ID: stages.ID,
                    tournament_id: stages.tournament_id,
                    format_id: stages.format_id,
                });
            seedData.stages.push(stage);
        }
    }
    console.log(`Created ${seedData.stages.length} stages`);
}

async function seedGroups() {
    console.log("Seeding groups...");
    for (const stage of seedData.stages) {
        if (
            stage.format_id ===
            seedData.stageFormats.find((f) => f.format === "groups")?.ID
        ) {
            const groupCount = faker.number.int({ min: 4, max: 8 });
            for (let i = 0; i < groupCount; i++) {
                const [group] = await db
                    .insert(groups)
                    .values({
                        stage_id: stage.ID,
                        name: `Group ${String.fromCharCode(65 + i)}`,
                        created_at: new Date(),
                        updated_at: new Date(),
                    })
                    .returning({ ID: groups.ID, stage_id: groups.stage_id });
                seedData.groups.push(group);
            }
        }
    }
    console.log(`Created ${seedData.groups.length} groups`);
}

async function seedPlayers() {
    console.log("Seeding players...");
    const playerCount = faker.number.int({ min: 30, max: 50 });
    for (let i = 0; i < playerCount; i++) {
        const teamId =
            Math.random() < 0.7
                ? faker.helpers.arrayElement(seedData.teams).ID
                : null;
        const userId =
            Math.random() < 0.5
                ? faker.helpers.arrayElement(seedData.users).ID
                : null;
        const [player] = await db
            .insert(players)
            .values({
                player_name:
                    faker.person.firstName() + " " + faker.person.lastName(),
                faceit_id: faker.string.alphanumeric(10),
                team_id: teamId,
                user_id: userId,
                player_logo: null,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning({
                ID: players.ID,
                team_id: players.team_id,
                user_id: players.user_id,
            });
        seedData.players.push(player);
    }
    console.log(`Created ${seedData.players.length} players`);
}

async function seedStageTeams() {
    console.log("Seeding stage teams...");
    for (const stage of seedData.stages) {
        const availableTeams = [...seedData.teams];
        const teamsForStage = faker.helpers.arrayElements(
            availableTeams,
            faker.number.int({
                min: 4,
                max: Math.min(16, availableTeams.length),
            })
        );
        const stageGroups = seedData.groups.filter(
            (g) => g.stage_id === stage.ID
        );
        for (let i = 0; i < teamsForStage.length; i++) {
            const team = teamsForStage[i];
            const groupId =
                stageGroups.length > 0
                    ? faker.helpers.arrayElement(stageGroups).ID
                    : null;
            await db.insert(stageTeams).values({
                stage_id: stage.ID,
                team_id: team.ID,
                group_id: groupId,
                seed: i,
                wins: faker.number.int({ min: 0, max: 5 }),
                losses: faker.number.int({ min: 0, max: 5 }),
                paid: Math.random() < 0.8,
                signed_up: true,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
    }
    console.log("Created stage team registrations");
}

async function seedMatches() {
    console.log("Seeding matches...");
    for (const group of seedData.groups) {
        const matchCount = faker.number.int({ min: 2, max: 6 });
        for (let i = 0; i < matchCount; i++) {
            const [match] = await db
                .insert(matches)
                .values({
                    group_id: group.ID,
                    round: `${faker.number.int({
                        min: 0,
                        max: 3,
                    })}-${faker.number.int({ min: 0, max: 3 })}`,
                    status: faker.helpers.arrayElement([
                        "SCHEDULED",
                        "LIVE",
                        "FINISHED",
                    ]),
                    scheduled_at: faker.date.future(),
                    faceit_url: `https://faceit.com/match/${faker.string.alphanumeric(
                        10
                    )}`,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning({
                    ID: matches.ID,
                    group_id: matches.group_id,
                    stage_id: matches.stage_id,
                    status: matches.status,
                });
            seedData.matches.push(match);
        }
    }
    const stagesWithGroups = new Set(seedData.groups.map((g) => g.stage_id));
    const stagesWithoutGroups = seedData.stages.filter(
        (stage) => !stagesWithGroups.has(stage.ID)
    );
    for (const stage of stagesWithoutGroups) {
        const matchCount = faker.number.int({ min: 2, max: 8 });
        for (let i = 0; i < matchCount; i++) {
            const [match] = await db
                .insert(matches)
                .values({
                    stage_id: stage.ID,
                    round: `${faker.number.int({
                        min: 0,
                        max: 3,
                    })}-${faker.number.int({ min: 0, max: 3 })}`,
                    status: faker.helpers.arrayElement([
                        "SCHEDULED",
                        "LIVE",
                        "FINISHED",
                    ]),
                    scheduled_at: faker.date.future(),
                    faceit_url: `https://faceit.com/match/${faker.string.alphanumeric(
                        10
                    )}`,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning({
                    ID: matches.ID,
                    group_id: matches.group_id,
                    stage_id: matches.stage_id,
                    status: matches.status,
                });
            seedData.matches.push(match);
        }
    }
    console.log(`Created ${seedData.matches.length} matches`);
}

async function seedMatchParticipants() {
    console.log("Seeding match participants...");
    for (const match of seedData.matches) {
        let stageTeamsForMatch;
        if (match.group_id) {
            stageTeamsForMatch = await db
                .select()
                .from(stageTeams)
                .where(eq(stageTeams.group_id, match.group_id));
        } else if (match.stage_id) {
            stageTeamsForMatch = await db
                .select()
                .from(stageTeams)
                .where(
                    and(
                        eq(stageTeams.stage_id, match.stage_id),
                        isNull(stageTeams.group_id)
                    )
                );
        }
        if (stageTeamsForMatch && stageTeamsForMatch.length >= 2) {
            const selectedTeams = faker.helpers.arrayElements(
                stageTeamsForMatch.map((st) => st.team_id),
                2
            );
            for (let i = 0; i < selectedTeams.length; i++) {
                const [participant] = await db
                    .insert(matchParticipants)
                    .values({
                        match_id: match.ID,
                        team_id: selectedTeams[i],
                        position: i + 1,
                        winner: i === 0 && match.status === "FINISHED",
                        created_at: new Date(),
                        updated_at: new Date(),
                    })
                    .returning({
                        ID: matchParticipants.ID,
                        match_id: matchParticipants.match_id,
                        team_id: matchParticipants.team_id,
                        position: matchParticipants.position,
                    });
                seedData.matchParticipants.push(participant);
            }
        }
    }
    console.log(
        `Created ${seedData.matchParticipants.length} match participants`
    );
}

async function seedMaps() {
    console.log("Seeding maps...");
    const mapNames = [
        "Black Widow",
        "Port",
        "Eagle's Nest",
        "Sub Base",
        "Ankara",
        "Metro",
        "Mexico",
    ];
    for (const match of seedData.matches) {
        if (match.status === "FINISHED") {
            const mapCount = faker.number.int({ min: 1, max: 3 });
            const participants = seedData.matchParticipants.filter(
                (mp) => mp.match_id === match.ID
            );
            for (let i = 0; i < mapCount; i++) {
                const winner =
                    participants.length > 0
                        ? faker.helpers.arrayElement(participants).ID
                        : null;
                const [map] = await db
                    .insert(maps)
                    .values({
                        match_id: match.ID,
                        map_name: faker.helpers.arrayElement(mapNames),
                        round: `${i + 1}`,
                        winner_id: winner,
                        created_at: new Date(),
                        updated_at: new Date(),
                    })
                    .returning({
                        ID: maps.ID,
                        match_id: maps.match_id,
                        winner_id: maps.winner_id,
                    });
                seedData.maps.push(map);
            }
        }
    }
    console.log(`Created ${seedData.maps.length} maps`);
}

async function seedMatchCasters() {
    console.log("Seeding match casters...");
    const casterUsers = seedData.users.slice(
        0,
        Math.min(5, seedData.users.length)
    );
    for (const match of seedData.matches) {
        if (Math.random() < 0.6) {
            const casterCount = faker.number.int({ min: 1, max: 2 });
            const selectedCasters = faker.helpers.arrayElements(
                casterUsers.map((u) => u.ID),
                casterCount
            );
            for (const casterId of selectedCasters) {
                await db.insert(matchCasters).values({
                    match_id: match.ID,
                    caster_id: casterId,
                    assigned_at: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
        }
    }
    console.log("Created match caster assignments");
}

async function seedUserRoles() {
    console.log("Seeding user roles...");
    const rolesByName = await db.select().from(roles);
    const adminRole = rolesByName.find((r) => r.name === "admin");
    const userRole = rolesByName.find((r) => r.name === "user");
    const casterRole = rolesByName.find((r) => r.name === "caster");
    for (const user of seedData.users) {
        if (adminRole) {
            await db.insert(userRoles).values({
                user_id: user.ID,
                role_id: adminRole.ID,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        if (userRole) {
            await db.insert(userRoles).values({
                user_id: user.ID,
                role_id: userRole.ID,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        if (casterRole && Math.random() < 0.3) {
            await db.insert(userRoles).values({
                user_id: user.ID,
                role_id: casterRole.ID,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
    }
    console.log("Created user role assignments");
}

async function seedPlayerStats() {
    console.log("Seeding player stats...");
    for (const map of seedData.maps) {
        const match = seedData.matches.find((m) => m.ID === map.match_id);
        if (!match) continue;
        const participants = seedData.matchParticipants.filter(
            (mp) => mp.match_id === match.ID
        );
        const participantTeams = participants.map((p) => p.team_id);
        const playersInMatch = seedData.players.filter(
            (p) => p.team_id && participantTeams.includes(p.team_id)
        );
        for (const player of playersInMatch.slice(0, 10)) {
            await db.insert(playerStats).values({
                player_id: player.ID,
                match_id: match.ID,
                map_id: map.ID,
                kills: faker.number.int({ min: 0, max: 30 }),
                deaths: faker.number.int({ min: 0, max: 25 }),
                assists: faker.number.int({ min: 0, max: 15 }),
                adr: faker.number.int({ min: 50, max: 150 }),
                damage: faker.number.int({ min: 0, max: 3000 }),
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
    }
    console.log("Created player statistics");
}

async function seed() {
    try {
        console.log("Starting database seeding...");
        await clearDatabase();
        await seedRoles();
        await seedStageFormats();
        await seedUsers();
        await seedTeams();
        await linkUsersToTeams();
        await seedTournaments();
        await seedStages();
        await seedGroups();
        await seedPlayers();
        await seedStageTeams();
        await seedMatches();
        await seedMatchParticipants();
        await seedMaps();
        await seedMatchCasters();
        await seedUserRoles();
        await seedPlayerStats();
        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
}

seed()
    .then(() => {
        console.log("Seed script finished");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Seed script failed:", error);
        process.exit(1);
    });
