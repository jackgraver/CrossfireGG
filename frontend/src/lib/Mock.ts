import type { Match, Team } from "../types/Types";

export const TEAMS: Team[] = [
    {
        id: "A",
        name: "ATeam",
        seed: 1,
        record: {
            win: 0,
            loss: 0,
        },
        paid: false,
        joined_tournament: false,
    },
    {
        id: "B",
        name: "BTeam",
        seed: 2,
        record: {
            win: 0,
            loss: 0,
        },
        paid: false,
        joined_tournament: false,
    },
    {
        id: "C",
        name: "CTeam",
        seed: 3,
        record: {
            win: 0,
            loss: 0,
        },
        paid: false,
        joined_tournament: false,
    },
    {
        id: "D",
        name: "DTeam",
        seed: 4,
        record: {
            win: 0,
            loss: 0,
        },
        paid: false,
        joined_tournament: false,
    },
];

export const FIRSTMATCHES: Match[] = [
    {
        match_id: "A-B",
        teams: {
            faction1: {
                id: "A",
                name: "ATeam",
                seed: 1,
                record: {
                    win: 0,
                    loss: 0,
                },
                paid: false,
                joined_tournament: false,
            },
            faction2: {
                id: "B",
                name: "BTeam",
                seed: 2,
                record: {
                    win: 0,
                    loss: 0,
                },
                paid: false,
                joined_tournament: false,
            },
        },
        round: "0-0",
        results: {
            winner: "A",
            score: {
                faction1: 0,
                faction2: 0,
            },
        },
    },
];
