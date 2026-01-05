import { Team } from "@/types/TeamModel";

export default function TeamLogo({
    team,
    avatar,
    styling,
}: {
    team?: Team | undefined;
    avatar?: string | undefined;
    styling: string | undefined;
}) {
    if (!team && !avatar) return null;
    if (team && !team.team_logo && !avatar) return null;

    const placeholder = "/oss-logo-placeholder.png";

    const isValidSrc = (src: string | undefined | null): src is string =>
        !!src && typeof src === "string" && src.trim() !== "";

    const avatarSrc = team ? team.team_logo : avatar;

    console.log("ava", avatarSrc);
    return (
        <img
            src={isValidSrc(avatarSrc) ? avatarSrc : placeholder}
            onError={(e) => {
                if (!e.currentTarget.src.includes(placeholder)) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                }
            }}
            alt={team?.name || "Team Logo"}
            className={styling}
            loading="lazy"
        />
    );
}
