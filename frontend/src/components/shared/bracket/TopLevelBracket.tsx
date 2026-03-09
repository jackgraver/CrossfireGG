import { GroupWithMatchesDTO, StageFormatDTO } from "@repo/contracts";
import RegularSeasonBracket from "./bracket_types/RegularSeasonBracket";
import Groups from "./bracket_types/Groups/Groups";
import PlayoffBracket from "./bracket_types/PlayoffBracket";
import { useMemo } from "react";
import { MatchDropdownProvider } from "./components/MatchDropdownProvider";

export default function TopLevelBracket({
    stageFormat,
    groups,
}: {
    stageFormat: StageFormatDTO;
    groups: GroupWithMatchesDTO[];
}) {
    const allMatches = useMemo(
        () => groups.flatMap((group) => group.matches),
        [groups],
    );

    if (!stageFormat) return null;

    return (
        <MatchDropdownProvider>
            {(() => {
                switch (stageFormat.name.toLowerCase()) {
                    case "groups":
                        return <Groups groups={groups} />;
                    case "single elimination":
                        return <PlayoffBracket matches={allMatches} />;
                    case "swiss":
                        return <RegularSeasonBracket matches={allMatches} />;
                    default:
                        return (
                            <div className="text-xl text-red-500">
                                Warning: Stage format not supported
                            </div>
                        );
                }
            })()}
        </MatchDropdownProvider>
    );
}
