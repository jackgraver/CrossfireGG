export type UserPublic = {
    user_id: string;
    user_name: string;
    email: string;
    faceit_id?: string | null;
    team_id?: string | null;
};

export type UserRole = {
    user_id: string;
    role_id: number;
};

export type Role = {
    role_id: number;
    role_name: string;
};
