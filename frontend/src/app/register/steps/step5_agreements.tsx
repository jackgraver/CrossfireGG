type RegisterStep5AgreementsProps = {
    rulesAndGuidelines: boolean;
    discordConfirmation: boolean;
    onRulesAndGuidelinesChange: any;
    onDiscordConfirmationChange: any;
};

export default function RegisterStep5Agreements({
    rulesAndGuidelines,
    discordConfirmation,
    onRulesAndGuidelinesChange,
    onDiscordConfirmationChange,
}: RegisterStep5AgreementsProps) {
    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Please Review the Following
            </h1>
            <div className="flex text-start">
                <p>
                    I, as a representative of my team, can say that my team and
                    I understand the rules and guidelines of Crossfire Season 3
                </p>
                <input
                    type="checkbox"
                    onChange={(e) => onRulesAndGuidelinesChange(false)}
                />
            </div>
            <div className="flex text-start">
                <p>
                    All members of my team that are participating are currently
                    in the Crossfire Discord.
                </p>
                <input
                    type="checkbox"
                    onChange={(e) => onRulesAndGuidelinesChange(false)}
                />
            </div>
        </>
    );
}
