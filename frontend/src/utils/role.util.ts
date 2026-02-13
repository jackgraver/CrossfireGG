import { Role } from "@repo/types";

export function matchesRole(userRoles: string[] = [], ...requiredRoles: Role[]) {
    return requiredRoles.some((role) => userRoles.includes(role));
}
