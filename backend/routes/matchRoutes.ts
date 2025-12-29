import { Router, Request, Response } from "express";
import { db } from "../config/database";
import {
    matches,
    matchParticipants,
    teams,
    players,
    maps,
    groups,
    stages,
} from "../schemas";
import { eq, and, isNull } from "drizzle-orm";

const router = Router();

router.get("/:matchId", async (req: Request, res: Response) => {
    try {
        const matchId = parseInt(req.params.matchId);

        if (isNaN(matchId)) {
            return res.status(400).json({ error: "Invalid match ID" });
        }

        const matchData = await db
            .select()
            .from(matches)
            .where(and(eq(matches.ID, matchId), isNull(matches.deleted_at)))
            .limit(1);

        if (matchData.length === 0) {
            return res.status(404).json({ error: "Match not found" });
        }

        const match = matchData[0];

        const participants = await db
            .select({
                participant: matchParticipants,
                team: teams,
            })
            .from(matchParticipants)
            .innerJoin(teams, eq(matchParticipants.team_id, teams.ID))
            .where(
                and(
                    eq(matchParticipants.match_id, matchId),
                    isNull(matchParticipants.deleted_at),
                    isNull(teams.deleted_at)
                )
            );

        if (participants.length < 2) {
            return res
                .status(404)
                .json({ error: "Match participants not found" });
        }

        const team1Data = participants[0].team;
        const team2Data = participants[1].team;
        const team1Participant = participants[0].participant;
        const team2Participant = participants[1].participant;

        const winnerId =
            team1Participant.winner === 1
                ? team1Data.ID.toString()
                : team2Participant.winner === 1
                ? team2Data.ID.toString()
                : null;

        const group = match.group_id
            ? await db
                  .select()
                  .from(groups)
                  .where(eq(groups.ID, match.group_id))
                  .limit(1)
            : [];

        const stage =
            group.length > 0
                ? await db
                      .select()
                      .from(stages)
                      .where(eq(stages.ID, group[0].stage_id))
                      .limit(1)
                : [];

        const sub_t_id = stage.length > 0 ? stage[0].ID.toString() : null;

        const players1 = await db
            .select()
            .from(players)
            .where(
                and(
                    eq(players.team_id, team1Data.ID),
                    isNull(players.deleted_at)
                )
            );

        const players2 = await db
            .select()
            .from(players)
            .where(
                and(
                    eq(players.team_id, team2Data.ID),
                    isNull(players.deleted_at)
                )
            );

        const matchMaps = await db
            .select()
            .from(maps)
            .where(and(eq(maps.match_id, matchId), isNull(maps.deleted_at)));

        const team1 = {
            team_id: team1Data.ID.toString(),
            team_name: team1Data.name,
            team_logo: team1Data.team_logo || null,
        };

        const team2 = {
            team_id: team2Data.ID.toString(),
            team_name: team2Data.name,
            team_logo: team2Data.team_logo || null,
        };

        const formattedMatch = {
            match_id: match.ID.toString(),
            status: match.status || "SCHEDULED",
            scheduled_at: match.scheduled_at
                ? Math.floor(match.scheduled_at.getTime() / 1000)
                : 0,
            round: (match.round as any) || "0-0",
            faceit_url: match.faceit_url || "",
            winner: winnerId || "",
            teams: {
                team1,
                team2,
            },
            team1_score: 0,
            team2_score: 0,
            caster_id: undefined,
        };

        const formattedPlayers1 = players1.map((player) => ({
            player_id: player.ID.toString(),
            player_id_i: player.ID.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team1Data.ID.toString(),
        }));

        const formattedPlayers2 = players2.map((player) => ({
            player_id: player.ID.toString(),
            player_id_i: player.ID.toString(),
            player_logo: player.player_logo || "",
            player_name: player.player_name,
            sub_t_id: sub_t_id || "",
            team_id: team2Data.ID.toString(),
        }));

        const formattedMaps = matchMaps.map((map) => {
            const roundNumber = map.round
                ? parseInt(map.round.toString(), 10) || 0
                : 0;
            return {
                map_id: map.ID.toString(),
                match_id: match.ID.toString(),
                map_name: map.map_name,
                round: roundNumber,
                winner_id: map.winner_id?.toString() || "",
                team1_score: map.team1_score || 0,
                team2_score: map.team2_score || 0,
                teams: [],
            };
        });

        res.json({
            match: formattedMatch,
            team1,
            team2,
            players1: formattedPlayers1,
            players2: formattedPlayers2,
            maps: formattedMaps,
        });
    } catch (error) {
        console.error("Error fetching match:", error);
        res.status(500).json({ error: "Failed to fetch match" });
    }
});

export default router;
