import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// @ts-expect-error - teams is defined later, but this is a valid circular reference in Drizzle
export const users = sqliteTable("users", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    // @ts-expect-error - teams is defined later, but this is a valid circular reference in Drizzle
    team_id: integer("team_id").references(() => teams.ID),
    refresh_token: text("refresh_token"),
    token_version: integer("token_version").default(0),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const roles = sqliteTable("roles", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const userRoles = sqliteTable(
    "user_roles",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        user_id: integer("user_id")
            .notNull()
            .references(() => users.ID),
        role_id: integer("role_id")
            .notNull()
            .references(() => roles.ID),
        CreatedAt: integer("CreatedAt", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
    },
    (table) => ({
        uniqueUserRole: unique().on(table.user_id, table.role_id),
    })
);

// @ts-expect-error - users is defined earlier, but this is a valid circular reference in Drizzle
export const teams = sqliteTable("teams", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    team_logo: text("team_logo"),
    faceit_id: text("faceit_id"),
    team_captain_id: integer("team_captain_id")
        .notNull()
        // @ts-expect-error - users is defined earlier, but this is a valid circular reference in Drizzle
        .references(() => users.ID),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const tournaments = sqliteTable("tournaments", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    faceit_id: text("faceit_id"),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const stages = sqliteTable("stages", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    tournament_id: integer("tournament_id")
        .notNull()
        .references(() => tournaments.ID),
    name: text("name").notNull(),
    format: text("format"),
    is_current: integer("is_current", { mode: "boolean" }).default(false),
    start_date: integer("start_date", { mode: "timestamp" }),
    end_date: integer("end_date", { mode: "timestamp" }),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const groups = sqliteTable("groups", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    stage_id: integer("stage_id")
        .notNull()
        .references(() => stages.ID),
    name: text("name").notNull(),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const matches = sqliteTable("matches", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    group_id: integer("group_id")
        .notNull()
        .references(() => groups.ID),
    round: text("round"),
    status: text("status"),
    scheduled_at: integer("scheduled_at", { mode: "timestamp" }),
    faceit_url: text("faceit_url"),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const matchParticipants = sqliteTable("match_participants", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    team_id: integer("team_id")
        .notNull()
        .references(() => teams.ID),
    winner: integer("winner").default(0),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const maps = sqliteTable("maps", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    map_name: text("map_name").notNull(),
    round: text("round"),
    winner_id: integer("winner_id").references(() => matchParticipants.ID),
    team1_score: integer("team1_score").default(0),
    team2_score: integer("team2_score").default(0),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const matchCasters = sqliteTable("match_casters", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    caster_id: integer("caster_id")
        .notNull()
        .references(() => users.ID),
    assigned_at: integer("assigned_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const players = sqliteTable("players", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    player_name: text("player_name").notNull(),
    faceit_id: text("faceit_id"),
    team_id: integer("team_id").references(() => teams.ID),
    user_id: integer("user_id").references(() => users.ID),
    player_logo: text("player_logo"),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const playerStats = sqliteTable("player_stats", {
    ID: integer("ID").primaryKey({ autoIncrement: true }),
    player_id: integer("player_id")
        .notNull()
        .references(() => players.ID),
    match_id: integer("match_id")
        .notNull()
        .references(() => matches.ID),
    map_id: integer("map_id")
        .notNull()
        .references(() => maps.ID),
    kills: integer("kills").default(0),
    deaths: integer("deaths").default(0),
    assists: integer("assists").default(0),
    adr: integer("adr").default(0),
    damage: integer("damage").default(0),
    CreatedAt: integer("CreatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
    DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
});

export const tournamentTeams = sqliteTable(
    "tournament_teams",
    {
        ID: integer("ID").primaryKey({ autoIncrement: true }),
        tournament_id: integer("tournament_id")
            .notNull()
            .references(() => tournaments.ID),
        team_id: integer("team_id")
            .notNull()
            .references(() => teams.ID),
        group_id: integer("group_id").references(() => groups.ID),
        seed: integer("seed").default(0),
        wins: integer("wins").default(0),
        losses: integer("losses").default(0),
        paid: integer("paid", { mode: "boolean" }).default(false),
        signed_up: integer("signed_up", { mode: "boolean" }).default(false),
        CreatedAt: integer("CreatedAt", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        UpdatedAt: integer("UpdatedAt", { mode: "timestamp" })
            .notNull()
            .$defaultFn(() => new Date()),
        DeletedAt: integer("DeletedAt", { mode: "timestamp" }),
    },
    (table) => ({
        uniqueTournamentTeam: unique().on(table.tournament_id, table.team_id),
    })
);

export const usersRelations = relations(users, ({ one, many }) => ({
    team: one(teams, {
        fields: [users.team_id],
        references: [teams.ID],
    }),
    captainOfTeam: one(teams, {
        fields: [users.ID],
        references: [teams.team_captain_id],
    }),
    player: one(players, {
        fields: [users.ID],
        references: [players.user_id],
    }),
    userRoles: many(userRoles),
    matchCasters: many(matchCasters),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.user_id],
        references: [users.ID],
    }),
    role: one(roles, {
        fields: [userRoles.role_id],
        references: [roles.ID],
    }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
    captain: one(users, {
        fields: [teams.team_captain_id],
        references: [users.ID],
    }),
    players: many(players),
    matchParticipants: many(matchParticipants),
    tournamentTeams: many(tournamentTeams),
}));

export const tournamentsRelations = relations(tournaments, ({ many }) => ({
    stages: many(stages),
    tournamentTeams: many(tournamentTeams),
}));

export const stagesRelations = relations(stages, ({ one, many }) => ({
    tournament: one(tournaments, {
        fields: [stages.tournament_id],
        references: [tournaments.ID],
    }),
    groups: many(groups),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
    stage: one(stages, {
        fields: [groups.stage_id],
        references: [stages.ID],
    }),
    matches: many(matches),
    tournamentTeams: many(tournamentTeams),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
    group: one(groups, {
        fields: [matches.group_id],
        references: [groups.ID],
    }),
    participants: many(matchParticipants),
    casters: many(matchCasters),
    maps: many(maps),
    playerStats: many(playerStats),
}));

export const matchParticipantsRelations = relations(
    matchParticipants,
    ({ one, many }) => ({
        match: one(matches, {
            fields: [matchParticipants.match_id],
            references: [matches.ID],
        }),
        team: one(teams, {
            fields: [matchParticipants.team_id],
            references: [teams.ID],
        }),
        maps: many(maps),
    })
);

export const mapsRelations = relations(maps, ({ one, many }) => ({
    match: one(matches, {
        fields: [maps.match_id],
        references: [matches.ID],
    }),
    winner: one(matchParticipants, {
        fields: [maps.winner_id],
        references: [matchParticipants.ID],
    }),
    playerStats: many(playerStats),
}));

export const matchCastersRelations = relations(matchCasters, ({ one }) => ({
    match: one(matches, {
        fields: [matchCasters.match_id],
        references: [matches.ID],
    }),
    caster: one(users, {
        fields: [matchCasters.caster_id],
        references: [users.ID],
    }),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
    team: one(teams, {
        fields: [players.team_id],
        references: [teams.ID],
    }),
    user: one(users, {
        fields: [players.user_id],
        references: [users.ID],
    }),
    stats: many(playerStats),
}));

export const playerStatsRelations = relations(playerStats, ({ one }) => ({
    player: one(players, {
        fields: [playerStats.player_id],
        references: [players.ID],
    }),
    match: one(matches, {
        fields: [playerStats.match_id],
        references: [matches.ID],
    }),
    map: one(maps, {
        fields: [playerStats.map_id],
        references: [maps.ID],
    }),
}));

export const tournamentTeamsRelations = relations(
    tournamentTeams,
    ({ one }) => ({
        tournament: one(tournaments, {
            fields: [tournamentTeams.tournament_id],
            references: [tournaments.ID],
        }),
        team: one(teams, {
            fields: [tournamentTeams.team_id],
            references: [teams.ID],
        }),
        group: one(groups, {
            fields: [tournamentTeams.group_id],
            references: [groups.ID],
        }),
    })
);
