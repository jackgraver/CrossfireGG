import type { FileRouteTypes } from "@/routeTree.gen";

export type AppRouteTo = FileRouteTypes["to"];

export type AppRouteParams = {
    tournament_id?: string;
    tournamentId?: string;
    stageId?: string;
    team_id?: string;
    match_id?: string;
};
