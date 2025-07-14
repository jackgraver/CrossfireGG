import { Team } from "@/types/Types";

export default function TeamLogo({
    team,
    styling,
}: {
    team: Team | undefined;
    styling: string | undefined;
}) {
    if (!team) return null;
    if (!team.team_logo) return null;

    const placeholder = "/oss-logo-placeholder.png";

    const isValidSrc = (src: string | undefined | null): src is string =>
        !!src && typeof src === "string" && src.trim() !== "";

    return (
        <img
            src={isValidSrc(team.team_logo) ? team.team_logo : placeholder}
            onError={(e) => {
                if (!e.currentTarget.src.includes(placeholder)) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                }
            }}
            alt={team.team_name || "Team Logo"}
            className={styling}
            loading="lazy"
        />
    );
}
