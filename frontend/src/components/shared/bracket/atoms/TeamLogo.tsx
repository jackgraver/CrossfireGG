import { TeamDTO } from "@repo/contracts";

export default function TeamLogo({
    team,
    avatar,
    styling,
}: {
    team?: TeamDTO | undefined;
    avatar?: string | undefined;
    styling: string | undefined;
}) {
    if (!team && !avatar) return null;

    const placeholder = "/crossfire.png";

    const isValidSrc = (src: string | undefined | null): src is string =>
        !!src && typeof src === "string" && src.trim() !== "";

    const avatarSrc = team ? team.team_logo : avatar;

    return (
        <img
            src={isValidSrc(avatarSrc) ? avatarSrc : placeholder}
            onError={(e) => {
                if (!e.currentTarget.src.includes(placeholder)) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                }
            }}
            alt={"LOGO"}
            className={styling}
            loading="lazy"
        />
    );
}
