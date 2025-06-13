import { useParams } from "react-router-dom";
import type { Match } from "../types/Types";
import { useEffect, useState } from "react";

export default function MatchPage() {
    return <></>;
    // const { match_id } = useParams();
    // const [match, setMatch] = useState<Match | null>(null);

    // useEffect(() => {
    //     if (!match_id) return;

    //     fetch(
    //         `https://open.faceit.com/data/v4/matches/${match_id}`, // Your API endpoint goes here
    //         {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer`,
    //                 Accept: "application/json",
    //             },
    //         }
    //     )
    //         .then((res) => {
    //             if (!res.ok) throw new Error(`Error: ${res.status}`);
    //             return res.json();
    //         })
    //         .then((data) => {
    //             setMatch(data);
    //         })
    //         .catch((err) => {
    //             console.error("Fetch error:", err);
    //         });
    // }, [match_id]);

    // return (
    //     <>
    //         {match && (
    //             <div className="p-6 text-white">
    //                 <h2 className="text-2xl font-bold mb-4 text-center">
    //                     Match Results
    //                 </h2>
    //                 <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl shadow-lg">
    //                     <div className="flex justify-between items-center">
    //                         <span className="text-lg font-semibold">
    //                             {match.teams.faction1.team_name}
    //                         </span>
    //                         <span
    //                             className={`text-lg font-bold ${
    //                                 match.results.winner === "faction1"
    //                                     ? "text-green-400"
    //                                     : "text-white"
    //                             }`}
    //                         >
    //                             {match.results.score.faction1}
    //                         </span>
    //                     </div>
    //                     <div className="flex justify-between items-center">
    //                         <span className="text-lg font-semibold">
    //                             {match.teams.faction2.team_name}
    //                         </span>
    //                         <span
    //                             className={`text-lg font-bold ${
    //                                 match.results.winner === "faction2"
    //                                     ? "text-green-400"
    //                                     : "text-white"
    //                             }`}
    //                         >
    //                             {match.results.score.faction2}
    //                         </span>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );
}
