import { StageFormat } from "@/types/TournamentModel";
import { Match } from "@/types/Types";
import RegularSeasonBracket from "./bracket_types/RegularSeasonBracket";
import Groups from "./bracket_types/Groups";

export default function TopLevelBracket({ stageFormat, matches }: { stageFormat: StageFormat | undefined, matches: Match[] }) {
    console.log('format', stageFormat);
    if (!stageFormat) {
        return <></>
    }

    switch (stageFormat.name.toLowerCase()) {
        case "groups":
            return <Groups matches={matches} />
        case "single elimination":
            return null;
        case "swiss":
            return <RegularSeasonBracket matches={matches} />
        default:
            return <div className="text-red-500 text-xl">Warning: Stage format not supported</div>;
    }
}