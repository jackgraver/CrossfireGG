export type FaceitPlayerTeamsResponse = {
    items: {
        team_id: string;
        name: string;
        avatar: string;
        leader: string;
    }[];
};

export type FaceitTeamPlayersResponse = {
    name: string;
    team_id: string;
    avatar: string;
    leader: string;
    members: {
        user_id: string;
        nickname: string;
        avatar: string;
        country: string;
    }[];
};
