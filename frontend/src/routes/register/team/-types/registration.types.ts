export const formSteps = [
    "team",
    "starters",
    "subs",
    "coach",
    "agreements",
    "review",
    "finished",
] as const;

export type FormStep = (typeof formSteps)[number];

export type Player = {
    faceitId: string;
    hltvLink: string;
    discordId: string;
    playerName: string;
    nationality: string;
    avatar: string;
};

export type Team = {
    teamId: string;
    name: string;
    twitter: string;
    captainFaceitId: string;
    logo: string;
};

export type RegistrationFormData = {
    team: Team;
    starters: Player[];
    subs: Player[];
    coach: Player[];
    agreements: {
        rulesAndGuidelines: boolean;
        discordConfirmation: boolean;
    };
};

export type StepValidationErrors = Partial<
    Record<keyof RegistrationFormData | string, string[]>
>;

export type StepValidationResult = {
    isValid: boolean;
    errors: StepValidationErrors;
};

export type StepConfig = {
    id: FormStep;
    title: string;
    description?: string;
    canSkip?: boolean;
};
