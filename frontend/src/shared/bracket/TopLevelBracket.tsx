import { GroupWithMatchesAndFormatDTO, GroupWithMatchesDTO, StageFormatDTO } from "@repo/contracts";
import RegularSeasonBracket from "./bracket_types/RegularSeasonBracket";
import Groups from "./bracket_types/Groups";
import PlayoffBracket from "./bracket_types/PlayoffBracket";
import { useMemo } from "react";

export default function TopLevelBracket({
    stageFormat,
    groups,
}: {
    stageFormat: StageFormatDTO;
    groups: GroupWithMatchesDTO[];
}) {
    if (!stageFormat) {
        return <></>;
    }

    switch (stageFormat.name.toLowerCase()) {
        case "groups":
            return <Groups groups={groups} />;
        case "single elimination":
            const matches = useMemo(() => groups.flatMap((group) => group.matches), [groups]);
            return <PlayoffBracket matches={matches} />;
        case "swiss":
            //TODO: how to flat map only for bottom two?
            return <RegularSeasonBracket matches={groups.flatMap((group) => group.matches)} />;
        default:
            return <div className="text-xl text-red-500">Warning: Stage format not supported</div>;
    }
}
