export const Roles = {
    ADMIN: "ADMIN",
    PRODUCTION_LEAD: "PRODUCTION_LEAD",
    PRODUCTION: "PRODUCTION",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const ALL_ROLES = Object.values(Roles) as Role[];
