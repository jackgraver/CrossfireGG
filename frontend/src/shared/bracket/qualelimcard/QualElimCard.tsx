import type { Team } from "@/types/TeamModel";

type QualElimCardProps = {
    team: Team;
    qualified: boolean;
};

export default function QualElimCard({ team, qualified }: QualElimCardProps) {
    const bg = qualified ? "bg-green-500" : "bg-red-500";

    const sideText = qualified ? "QUALIFIED" : "ELIMINATED";

    return (
        <div className="flex flex-row">
            <div
                className={`flex items-center gap-x-3 bg-gray-400 p-2 ${bg}`}
                data-testid="qual-elim-card"
            >
                <img
                    src="https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg"
                    className="h-6 w-6"
                    alt="?"
                />

                <div className="min-w-[24px] text-left">
                    <span>{team?.seed}</span>
                </div>

                <div className="min-w-[120px] text-left">
                    <span>{team?.team_name}</span>
                </div>
            </div>
            <div className="bg-gray-400">
                <p
                    className="rotate-180 transform text-center"
                    style={{ writingMode: "vertical-rl" }}
                >
                    {sideText}
                </p>
            </div>
        </div>
    );
}
