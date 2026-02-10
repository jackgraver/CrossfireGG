import { useState, useRef, useEffect } from "react";
import {
    useTeamPlayers,
    useAddPlayerToTeam,
    useRemovePlayerFromTeam,
} from "../../-queries/team.queries";

interface TeamPlayerManagementProps {
    team_id: string;
    team: any;
}

export default function TeamPlayerManagement({
    team_id,
    team,
}: TeamPlayerManagementProps) {
    // const { data: players, isLoading: playersLoading } =
    //     useTeamPlayers(team_id);
    // const [searchQuery, setSearchQuery] = useState("");
    // const [showAutocomplete, setShowAutocomplete] = useState(false);
    // const autocompleteRef = useRef<HTMLDivElement>(null);
    // const inputRef = useRef<HTMLInputElement>(null);
    // // const { data: searchResults } = useSearchPlayers(
    // //     searchQuery,
    // //     team_id,
    // //     showAutocomplete && searchQuery.trim().length > 0,
    // // );
    // const addPlayerMutation = useAddPlayerToTeam(team_id);
    // const removePlayerMutation = useRemovePlayerFromTeam(team_id);
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (
    //             autocompleteRef.current &&
    //             !autocompleteRef.current.contains(event.target as Node) &&
    //             inputRef.current &&
    //             !inputRef.current.contains(event.target as Node)
    //         ) {
    //             setShowAutocomplete(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);
    // const handleAddPlayer = async (player: any) => {
    //     try {
    //         await addPlayerMutation.mutateAsync(player.player_id);
    //         setSearchQuery("");
    //         setShowAutocomplete(false);
    //     } catch (error) {
    //         console.error("Failed to add player:", error);
    //     }
    // };
    // const handleRemovePlayer = async (playerId: string) => {
    //     const player = players?.find((p: any) => p.id === playerId);
    //     if (
    //         player?.id &&
    //         team.team_captain_id &&
    //         player.id === team.team_captain_id
    //     ) {
    //         alert("Cannot remove the team captain from the team.");
    //         return;
    //     }
    //     if (
    //         confirm(
    //             "Are you sure you want to remove this player from the team?",
    //         )
    //     ) {
    //         try {
    //             await removePlayerMutation.mutateAsync(playerId);
    //         } catch (error) {
    //             console.error("Failed to remove player:", error);
    //         }
    //     }
    // };
    // return (
    //     <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
    //         <div className="mb-6 flex items-center justify-between">
    //             <h2 className="text-textPrimary text-2xl font-bold">Players</h2>
    //             <div className="relative ml-4 max-w-md flex-1">
    //                 <input
    //                     ref={inputRef}
    //                     type="text"
    //                     placeholder="Search players to invite..."
    //                     value={searchQuery}
    //                     onChange={(e) => {
    //                         setSearchQuery(e.target.value);
    //                         setShowAutocomplete(true);
    //                     }}
    //                     onFocus={() => {
    //                         if (searchQuery.trim().length > 0) {
    //                             setShowAutocomplete(true);
    //                         }
    //                     }}
    //                     className="text-textPrimary bg-secondBg border-border focus:border-thirdBg w-full rounded-lg border px-4 py-2 focus:outline-none"
    //                 />
    //                 {showAutocomplete &&
    //                     searchQuery.trim().length > 0 &&
    //                     searchResults &&
    //                     searchResults.length > 0 && (
    //                         <div
    //                             ref={autocompleteRef}
    //                             className="border-border bg-secondBg absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border shadow-lg"
    //                         >
    //                             {searchResults.map((player: any) => (
    //                                 <div
    //                                     key={player.player_id}
    //                                     onClick={() => handleAddPlayer(player)}
    //                                     className="text-textPrimary hover:bg-thirdBg cursor-pointer px-4 py-2 transition-colors"
    //                                 >
    //                                     <div className="font-semibold">
    //                                         {player.player_name}
    //                                     </div>
    //                                     {player.faceit_id && (
    //                                         <div className="text-textSecondary text-sm">
    //                                             Faceit: {player.faceit_id}
    //                                         </div>
    //                                     )}
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     )}
    //                 {showAutocomplete &&
    //                     searchQuery.trim().length > 0 &&
    //                     searchResults &&
    //                     searchResults.length === 0 && (
    //                         <div
    //                             ref={autocompleteRef}
    //                             className="border-border bg-secondBg absolute z-10 mt-1 w-full rounded-lg border px-4 py-2 shadow-lg"
    //                         >
    //                             <div className="text-textSecondary">
    //                                 No players found
    //                             </div>
    //                         </div>
    //                     )}
    //             </div>
    //         </div>
    //         {playersLoading ? (
    //             <div className="text-textSecondary py-4 text-center">
    //                 Loading players...
    //             </div>
    //         ) : players && players.length > 0 ? (
    //             <div className="flex flex-col gap-3">
    //                 {players.map((player) => (
    //                     <div
    //                         key={player.id}
    //                         className="border-border bg-secondBg flex items-center justify-between rounded-lg border p-4"
    //                     >
    //                         <div className="flex items-center gap-4">
    //                             {player.player_logo && (
    //                                 <img
    //                                     src={player.player_logo}
    //                                     alt={player.player_name}
    //                                     className="h-12 w-12 rounded-full object-cover"
    //                                 />
    //                             )}
    //                             <div>
    //                                 <div className="text-textPrimary font-semibold">
    //                                     {player.player_name}
    //                                 </div>
    //                                 {player.faceit_id && (
    //                                     <div className="text-textSecondary text-sm">
    //                                         Faceit: {player.faceit_id}
    //                                     </div>
    //                                 )}
    //                             </div>
    //                         </div>
    //                         <button
    //                             onClick={() =>
    //                                 handleRemovePlayer(player.id.toString())
    //                             }
    //                             disabled={
    //                                 removePlayerMutation.isPending ||
    //                                 addPlayerMutation.isPending ||
    //                                 !!(
    //                                     player.id &&
    //                                     team.team_captain_id &&
    //                                     player.id === team.team_captain_id
    //                                 )
    //                             }
    //                             className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:bg-gray-500"
    //                             title={
    //                                 player.id &&
    //                                 team.team_captain_id &&
    //                                 player.id === team.team_captain_id
    //                                     ? "Cannot remove the team captain"
    //                                     : undefined
    //                             }
    //                         >
    //                             Remove
    //                         </button>
    //                     </div>
    //                 ))}
    //             </div>
    //         ) : (
    //             <div className="text-textSecondary py-10 text-center text-base">
    //                 No players on this team.
    //             </div>
    //         )}
    //     </div>
    // );
}
