import { StageFormat } from "@/types/TournamentModel";
import { Match } from "@/types/Types";
import RegularSeasonBracket from "./bracket_types/RegularSeasonBracket";

export default function TopLevelBracket({ stageFormat, matches }: { stageFormat: StageFormat | undefined, matches: Match[] }) {
    if (!stageFormat) {
        return <></>
    }
    console.log(matches);

    switch (stageFormat.name.toLowerCase()) {
        case "groups":
            return <RegularSeasonBracket matches={matches} />
        case "single elimination":
            return null;
        case "swiss":
            return <RegularSeasonBracket matches={matches} />
        default:
            return <div className="text-red-500 text-xl">Warning: Stage format not supported</div>;
    }
}