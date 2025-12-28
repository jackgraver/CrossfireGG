export type User = {
    user_id: string; // primary key (ID)
    name: string;
    email: string;
};

export type UserPublic = {
    user_id: string;
    user_name: string;
    email: string;
    faceit_id?: string | null;
    team_id?: string | null;
};

export type UserRole = {
    ID: string; // primary key
    user_id: string; // foreign key users.ID
    role_id: string; // foreign key roles.ID
};

export type Role = {
    role_id: string; // primary key (ID)
    role_name: string; // name
};
