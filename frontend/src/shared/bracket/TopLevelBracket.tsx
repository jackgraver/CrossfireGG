import { StageFormat } from "@/types/TournamentModel";
import { Match } from "@/types/Types";

export default function TopLevelBracket({ stageFormat, matches }: { stageFormat: StageFormat | undefined, matches: Match[] }) {
    if (!stageFormat) {
        return <></>
    }

    switch (stageFormat.name.toLowerCase()) {
        case "groups":
            return null;
        case "single elimination":
            return null;
        case "swiss":
            return null;
        default:
            return <div className="text-red-500 text-xl">Warning: Stage format not supported</div>;
    }
}