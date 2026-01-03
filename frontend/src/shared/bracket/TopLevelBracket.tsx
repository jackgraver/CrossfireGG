import { StageFormat } from "@/types/TournamentModel";
import { Match } from "@/types/Types";
import RegularSeasonBracket from "./bracket_types/RegularSeasonBracket";
import Groups from "./bracket_types/Groups";
import PlayoffBracket from "./bracket_types/PlayoffBracket";

export default function TopLevelBracket({
    stageFormat,
    stageId,
    matches,
}: {
    stageFormat: StageFormat | undefined;
    stageId: number | null;
    matches: Match[];
}) {
    if (!stageFormat) {
        return <></>;
    }

    switch (stageFormat.name.toLowerCase()) {
        case "groups":
            return <Groups stageId={stageId} matches={matches} />;
        case "single elimination":
            return <PlayoffBracket matches={matches} />;
        case "swiss":
            return <RegularSeasonBracket matches={matches} />;
        default:
            return (
                <div className="text-xl text-red-500">
                    Warning: Stage format not supported
                </div>
            );
    }
}
