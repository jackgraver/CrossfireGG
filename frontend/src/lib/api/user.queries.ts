import { useQuery } from "@tanstack/react-query";
import { apiGET } from "./client";
import { UserWithRolesDTO } from "@repo/contracts";

export const useAllUsers = () => {
    return useQuery<UserWithRolesDTO[]>({
        queryKey: ["users"],
        queryFn: () => apiGET<UserWithRolesDTO[]>("/user/all"),
    });
};
