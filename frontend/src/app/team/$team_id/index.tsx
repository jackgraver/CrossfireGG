import {
    createFileRoute,
    Link,
    redirect,
    useNavigate,
} from "@tanstack/react-router";
import type { Match } from "@/types/Types";
import { BooleanStatus } from "@/types/TeamModel";
import {
    useTeam,
    useTeamPlayers,
    useSearchPlayers,
    useAddPlayerToTeam,
    useRemovePlayerFromTeam,
} from "../-queries/teamQueries";
import { formatDateOnly } from "@/lib/dateUtils";
import TeamLogo from "@/shared/bracket/TeamLogo";
import { openInNewTab } from "@/lib/NewTab";
import { useState, useRef, useEffect } from "react";
import type { Player } from "@/types/PlayerModel";
import { useUser } from "@/context/UserContext";

function TeamNotFoundFallback({ message }: { message?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                <h1 className="text-textPrimary mb-4 text-3xl font-bold">
                    Team Not Found
                </h1>
                <p className="text-textSecondary mb-6 text-lg">
                    {message ||
                        "The team you're looking for doesn't exist or could not be loaded. Please check the URL and try again."}
                </p>
                <Link
                    to="/"
                    className="bg-secondBg hover:bg-thirdBg text-textPrimary inline-block rounded-lg px-6 py-3 font-semibold transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export const Route = createFileRoute("/team/$team_id/")({
    component: Team,
    // beforeLoad: () => {
    //     const { user, loading: userLoading } = useUser();
    //     const { team_id } = Route.useParams();

    //     console.log(user, userLoading);
    //     if (userLoading) {
    //         return;
    //     }

    //     if (!user || !user.team_id || user.team_id !== parseInt(team_id)) {
    //         throw redirect({
    //             to: "/",
    //             search: {
    //                 error: "You do not have access to this team",
    //             },
    //             replace: true,
    //         });
    //     }
    // },
});

function Team() {
    const { team_id } = Route.useParams();

    if (!team_id) {
        return (
            <TeamNotFoundFallback message="The team ID is missing or invalid. Please check the URL and try again." />
        );
    }

    const { data, isLoading, error } = useTeam(team_id);
    const { data: players, isLoading: playersLoading } =
        useTeamPlayers(team_id);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: searchResults } = useSearchPlayers(
        searchQuery,
        team_id,
        showAutocomplete && searchQuery.trim().length > 0,
    );

    const addPlayerMutation = useAddPlayerToTeam(team_id);
    const removePlayerMutation = useRemovePlayerFromTeam(team_id);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                autocompleteRef.current &&
                !autocompleteRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowAutocomplete(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddPlayer = async (player: Player) => {
        try {
            await addPlayerMutation.mutateAsync(player.player_id);
            setSearchQuery("");
            setShowAutocomplete(false);
        } catch (error) {
            console.error("Failed to add player:", error);
        }
    };

    const handleRemovePlayer = async (playerId: string) => {
        const player = players?.find((p) => p.player_id === playerId);
        if (
            player?.player_id &&
            team.team_captain_id &&
            player.player_id === team.team_captain_id
        ) {
            alert("Cannot remove the team captain from the team.");
            return;
        }
        if (
            confirm(
                "Are you sure you want to remove this player from the team?",
            )
        ) {
            try {
                await removePlayerMutation.mutateAsync(playerId);
            } catch (error) {
                console.error("Failed to remove player:", error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error) {
        return (
            <TeamNotFoundFallback message="Failed to load team information. The team may not exist or there was an error connecting to the server." />
        );
    }

    if (!data) {
        return <TeamNotFoundFallback />;
    }

    const { team, matches } = data;

    const formatDate = (timestamp: number) => {
        return formatDateOnly(timestamp);
    };

    const getMatchResult = (match: Match) => {
        if (match.status !== "FINISHED") return "Scheduled";
        if (match.winner === team.team_id) return "W";
        return "L";
    };

    const getMatchScore = (match: Match) => {
        if (match.status !== "FINISHED") return "vs";
        return `${match.team1_score}-${match.team2_score}`;
    };

    const getOpponent = (match: Match) => {
        return match?.teams?.team1?.team_id === team.team_id
            ? match?.teams?.team2?.team_name
            : match?.teams?.team1?.team_name;
    };

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-5">
            <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
                <div className="flex items-center gap-5">
                    <TeamLogo
                        team={team}
                        styling="h-32 w-32 rounded-full border-4 border-border object-cover"
                    />
                    <div className="flex-1">
                        <div className="mb-4 flex flex-row items-center gap-x-2">
                            <h1 className="text-textPrimary text-3xl font-bold">
                                {team.team_name}
                            </h1>
                            {team.win !== undefined &&
                                team.loss !== undefined && (
                                    <h2 className="text-textSecondary text-2xl font-bold">
                                        ({team.win}-{team.loss})
                                    </h2>
                                )}
                        </div>
                        <div className="text-textPrimary flex flex-wrap gap-6">
                            {team.seed !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Seed:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.seed}
                                    </span>
                                </div>
                            )}
                            {team.paid !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Paid:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.paid === BooleanStatus.True
                                            ? "Yes"
                                            : team.paid ===
                                                BooleanStatus.Pending
                                              ? "Pending"
                                              : "No"}
                                    </span>
                                </div>
                            )}
                            {team.joined_tournament !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Joined Tournament:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.joined_tournament ===
                                        BooleanStatus.True
                                            ? "Yes"
                                            : team.joined_tournament ===
                                                BooleanStatus.Pending
                                              ? "Pending"
                                              : "No"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-textPrimary text-2xl font-bold">
                        Players
                    </h2>
                    <div className="relative ml-4 max-w-md flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search players to invite..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowAutocomplete(true);
                            }}
                            onFocus={() => {
                                if (searchQuery.trim().length > 0) {
                                    setShowAutocomplete(true);
                                }
                            }}
                            className="text-textPrimary bg-secondBg border-border focus:border-thirdBg w-full rounded-lg border px-4 py-2 focus:outline-none"
                        />
                        {showAutocomplete &&
                            searchQuery.trim().length > 0 &&
                            searchResults &&
                            searchResults.length > 0 && (
                                <div
                                    ref={autocompleteRef}
                                    className="border-border bg-secondBg absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border shadow-lg"
                                >
                                    {searchResults.map((player) => (
                                        <div
                                            key={player.player_id}
                                            onClick={() =>
                                                handleAddPlayer(player)
                                            }
                                            className="text-textPrimary hover:bg-thirdBg cursor-pointer px-4 py-2 transition-colors"
                                        >
                                            <div className="font-semibold">
                                                {player.player_name}
                                            </div>
                                            {player.faceit_id && (
                                                <div className="text-textSecondary text-sm">
                                                    Faceit: {player.faceit_id}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        {showAutocomplete &&
                            searchQuery.trim().length > 0 &&
                            searchResults &&
                            searchResults.length === 0 && (
                                <div
                                    ref={autocompleteRef}
                                    className="border-border bg-secondBg absolute z-10 mt-1 w-full rounded-lg border px-4 py-2 shadow-lg"
                                >
                                    <div className="text-textSecondary">
                                        No players found
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
                {playersLoading ? (
                    <div className="text-textSecondary py-4 text-center">
                        Loading players...
                    </div>
                ) : players && players.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {players.map((player) => (
                            <div
                                key={player.player_id}
                                className="border-border bg-secondBg flex items-center justify-between rounded-lg border p-4"
                            >
                                <div className="flex items-center gap-4">
                                    {player.player_logo && (
                                        <img
                                            src={player.player_logo}
                                            alt={player.player_name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <div className="text-textPrimary font-semibold">
                                            {player.player_name}
                                        </div>
                                        {player.faceit_id && (
                                            <div className="text-textSecondary text-sm">
                                                Faceit: {player.faceit_id}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemovePlayer(player.player_id)
                                    }
                                    disabled={
                                        removePlayerMutation.isPending ||
                                        addPlayerMutation.isPending ||
                                        !!(
                                            player.player_id &&
                                            team.team_captain_id &&
                                            player.player_id ===
                                                team.team_captain_id
                                        )
                                    }
                                    className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-gray-500"
                                    title={
                                        player.player_id &&
                                        team.team_captain_id &&
                                        player.player_id ===
                                            team.team_captain_id
                                            ? "Cannot remove the team captain"
                                            : undefined
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-textSecondary py-10 text-center text-base">
                        No players on this team.
                    </div>
                )}
            </div>
            <div className="bg-firstBg rounded-xl p-8 shadow-md">
                <h2 className="text-textPrimary mb-6 text-2xl font-bold">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches
                            .sort(
                                (a, b) =>
                                    (b.scheduled_at ?? 0) -
                                    (a.scheduled_at ?? 0),
                            )
                            .map((match) => {
                                const getMatchResult = () => {
                                    if (match.status !== "FINISHED")
                                        return "Scheduled";
                                    if (match.winner === team.team_id)
                                        return "W";
                                    return "L";
                                };

                                const getMatchScore = () => {
                                    if (match.status !== "FINISHED")
                                        return "vs";
                                    return `${match.team1_score ?? 0}-${match.team2_score ?? 0}`;
                                };

                                const getOpponent = () => {
                                    return match?.teams?.team1?.team_id ===
                                        team.team_id
                                        ? match?.teams?.team2?.team_name
                                        : match?.teams?.team1?.team_name;
                                };

                                const result = getMatchResult();
                                const score = getMatchScore();
                                const opponent = getOpponent();

                                return (
                                    <div
                                        key={match.match_id}
                                        className="border-border bg-secondBg hover:bg-thirdBg cursor-pointer rounded-lg border p-5 transition-all hover:shadow-lg"
                                        onClick={() => {
                                            if (match.faceit_url) {
                                                openInNewTab(match.faceit_url);
                                            }
                                        }}
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            {match.round && (
                                                <span className="bg-firstbg-thirdBg text-textSecondary rounded-full px-3 py-1 text-sm font-medium">
                                                    {match.round}
                                                </span>
                                            )}
                                            {match.scheduled_at && (
                                                <span className="text-textSecondary text-sm">
                                                    {formatDateOnly(
                                                        match.scheduled_at,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-1 items-center gap-4">
                                                <span className="text-textPrimary font-semibold">
                                                    {team.team_name}
                                                </span>
                                                <span className="text-textPrimary min-w-[60px] text-center text-lg font-bold">
                                                    {score}
                                                </span>
                                                <span className="text-textPrimary font-semibold">
                                                    {opponent || "TBD"}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span
                                                    className={`min-w-[30px] rounded-full px-3 py-1 text-center text-sm font-bold ${
                                                        result === "W"
                                                            ? "bg-green-100 text-green-700"
                                                            : result === "L"
                                                              ? "bg-red-100 text-red-700"
                                                              : "bg-orange-100 text-orange-600"
                                                    }`}
                                                >
                                                    {result}
                                                </span>
                                                {match.status && (
                                                    <span className="text-textSecondary text-xs uppercase">
                                                        {match.status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                ) : (
                    <div className="text-textSecondary py-10 text-center text-base">
                        No matches found.
                    </div>
                )}
            </div>
        </div>
    );
}
