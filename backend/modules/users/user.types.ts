import { InferSelectModel } from "drizzle-orm";
import { users, userRoles, roles } from "@repo/schemas";

export type UserSchema = InferSelectModel<typeof users>;
export type UserRoleSchema = InferSelectModel<typeof userRoles>;
export type RoleSchema = InferSelectModel<typeof roles>;

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
    team_id?: number;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        team_id?: number;
        roles: string[];
    };
    refreshToken?: string;
}

export interface UserWithRoles {
    id: number;
    name: string;
    email: string;
    team_id?: number;
    roles: string[];
}
