import { Match } from "@/types/Types";
import MatchCard from "./MatchCard";

export default function GroupSection({ groupId, matches }: { groupId: string; matches: Match[] }) {
    return (
        <div className="flex flex-col border border-border rounded-md bg-firstBg p-4 min-w-[300px]">
            <h2 className="text-xl font-semibold text-textPrimary mb-4">Group {groupId}</h2>
            <div className="flex flex-col gap-2">
                {matches.map((match) => (
                    <MatchCard key={match.match_id} match={match} />
                ))}
            </div>
        </div>
    );
}   