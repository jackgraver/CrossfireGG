export type User = {
    user_id: string;
    name: string;
    email: string;
};

export type UserPublic = {
    user_id: string;
    user_name: string;
    email: string;
    faceit_id?: string | null;
};

export type UserRole = {
    ID: string;
    user_id: string;
    role_id: string;
};

export type Role = {
    role_id: string;
    role_name: string;
};
