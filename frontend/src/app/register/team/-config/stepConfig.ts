import { StepConfig, formSteps } from "../-types/registration.types";

export const stepConfig: StepConfig[] = [
    {
        id: formSteps[0],
        title: "Team",
        description: "Select your team and confirm details.",
    },
    {
        id: formSteps[1],
        title: "Starters",
        description: "Select 5 starters and add their info.",
    },
    {
        id: formSteps[2],
        title: "Subs",
        description: "Select up to 3 substitutes.",
    },
    {
        id: formSteps[3],
        title: "Coach",
        description: "Select a coach.",
    },
    {
        id: formSteps[4],
        title: "Agreements",
        description: "Rules and guidelines.",
    },
    {
        id: formSteps[5],
        title: "Review",
        description: "Review your registration details.",
    },
    {
        id: formSteps[6],
        title: "Finished",
        description: "Registration complete.",
    },
];
