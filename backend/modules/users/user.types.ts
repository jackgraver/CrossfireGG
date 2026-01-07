import { InferSelectModel } from "drizzle-orm";
import { user, userRoles, roles } from "../../schemas";

export type UserSchema = InferSelectModel<typeof user>;
export type UserRoleSchema = InferSelectModel<typeof userRoles>;
export type RoleSchema = InferSelectModel<typeof roles>;

export interface UserWithRoles {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    roles: string[];
}
