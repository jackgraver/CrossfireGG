import { useQuery } from "@tanstack/react-query";
import { tournamentsApi } from "../-api/tournamentsApi";
import { Tournament } from "@repo/contracts";

export const useTournaments = () => {
    return useQuery<Tournament[]>({
        queryKey: ["tournaments"],
        queryFn: () => tournamentsApi.getAllTournaments(),
    });
};
