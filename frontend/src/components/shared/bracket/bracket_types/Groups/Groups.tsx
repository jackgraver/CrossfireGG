import { GroupWithMatchesDTO } from "@repo/contracts";
import { Trophy } from "lucide-react";
import GroupCard from "./GroupCard";

export default function Groups({ groups }: { groups: GroupWithMatchesDTO[] }) {
    if (!groups || groups.length === 0) {
        return (
            <div className="border-border bg-firstBg/20 flex min-h-100 w-full flex-col items-center justify-center rounded-xl border border-dashed text-center">
                <Trophy className="mb-4 h-12 w-12 opacity-20" />
                <h3 className="text-textPrimary text-lg font-bold">
                    No Groups Found
                </h3>
                <p className="text-textSecondary text-sm">
                    Groups haven't been generated for this stage yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
                <GroupCard
                    key={group.id}
                    group={group}
                    matches={group.matches}
                />
            ))}
        </div>
    );
}
