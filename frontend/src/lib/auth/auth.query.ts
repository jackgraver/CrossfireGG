import { queryOptions } from "@tanstack/react-query";
import { getUserMeServerFn } from "./auth.functions";

export type UserType = {
    userId: string;
    name: string;
    image: string | null;
    faceitId: string;
    teamId: number;
    roles: string[];
};

export const meQueryOptions = () =>
    queryOptions({
        queryKey: ["me"],
        queryFn: () => getUserMeServerFn(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
