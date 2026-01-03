import { Match } from "@/types/Types";
import { getMatchesByGroup } from "../Bracket.util";
import GroupSection from "../components/GroupSection";

export default function Groups({ matches }: { matches: Match[] }) {
    const groups = getMatchesByGroup(matches);
    
    return (
        <div className="flex flex-col flex-wrap md:flex-row gap-4 p-4 overflow-x-auto">
            {Object.entries(groups).map(([groupId, matches], idx) => (
                <GroupSection key={`${groupId}-${idx}`} groupId={groupId} matches={matches} />
            ))}
        </div>
    );
}