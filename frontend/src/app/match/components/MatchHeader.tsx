import { formatMatchDate } from "@/lib/dateUtils";
import { Round, Team } from "@/types/Types";
import { useRouter } from "next/navigation";

type Match = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
    faceit_url: string;
    winner: string;
    teams: { team1: Team; team2: Team };
    team1_score: number;
    team2_score: number;
    caster_id?: number;
};

type MatchHeaderProps = {
    team1: Team;
    team2: Team;
    match: Match;
};

const formatScore = (score: number, winner: boolean) => {
    if (winner) {
        return <h1 className="text-green-500">{score}</h1>;
    }
    return <h1 className="text-red-500">{score}</h1>;
};

export default function MatchHeader({ team1, team2, match }: MatchHeaderProps) {
    if (!team1 || !team2 || !match) return null;

    const router = useRouter();

    return (
        <div className="flex max-w-5xl items-center justify-between gap-x-16 px-4">
            <span className="text-4xl font-extrabold text-green-400">
                {match.team1_score}
            </span>
            <div className="flex flex-col items-center text-center text-gray-400">
                <p className="font-bold text-white">{match.status}</p>
                <p>{formatMatchDate(match.scheduled_at)}</p>
                <p>Round {match.round}</p>
            </div>
            <span className="text-4xl font-extrabold text-white">
                {match.team2_score}
            </span>
        </div>
    );
    // // <div className="grid grid-cols-5 gap-x-4 gap-y-2">
    // <>
    //     <div className="flex w-full flex-row items-center justify-end gap-x-2">
    //         <img
    //             src={team1.team_logo}
    //             className="h-16 w-16 flex-shrink-0 rounded"
    //             onError={(e) => {
    //                 e.currentTarget.src = "/oss-logo-placeholder.png";
    //             }}
    //         />
    //         <h1
    //             className="cursor-pointer text-2xl"
    //             onClick={() => router.push(`/team/${team1.team_id}`)}
    //         >
    //             {team1.team_name}
    //         </h1>
    //         {/* </div> */}
    //         {/* <div className="items-center text-right text-4xl"> */}
    //         {formatScore(match.team1_score, match.winner === team1.team_id)}
    //     </div>
    //     <div className="mx-4 gap-y-4 text-center">
    //         <p className="text-xl">{formatMatchDate(match.scheduled_at)}</p>
    //         <p className="text-textSecondary text-xl">{match.status}</p>
    //     </div>
    //     <div className="items-center text-left text-4xl">
    //         {formatScore(match.team2_score, match.winner === team2.team_id)}
    //         {/* </div> */}
    //         {/* <div className="flex w-full flex-row items-center justify-start gap-x-2"> */}
    //         <h1
    //             className="cursor-pointer text-2xl"
    //             onClick={() => router.push(`/team/${team2.team_id}`)}
    //         >
    //             {team2.team_name}
    //         </h1>
    //         <img
    //             src={team2.team_logo}
    //             className="h-16 w-16 flex-shrink-0 rounded"
    //             onError={(e) => {
    //                 e.currentTarget.src = "/oss-logo-placeholder.png";
    //             }}
    //         />
    //     </div>
    // </>

    // <div className="flex flex-grow flex-row">
    //     <div className="flex flex-row">
    //         <div className="flex flex-row gap-x-4">
    //             <img
    //                 src={team1.team_logo || "/oss-logo-placeholder.png"}
    //                 className="h-12 w-12 flex-shrink-0 rounded"
    //                 onError={(e) => {
    //                     e.currentTarget.src = "/oss-logo-placeholder.png";
    //                 }}
    //             />
    //             <h1
    //                 className="cursor-pointer text-4xl"
    //                 onClick={() =>
    //                     // router.push(`/team/${team1.team_id}`)
    //                     router.push(`/`)
    //                 }
    //             >
    //                 {team1.team_name}
    //             </h1>
    //         </div>
    //     </div>
    //     <div className="ml-8 text-4xl">
    //         {formatScore(match.team1_score, match.winner === team1.team_id)}
    //     </div>
    //     <div className="w-64 text-center">
    //         <p className="text-textSecondary">{match.status}</p>
    //         <p className="text-sm">{formatMatchDate(match.scheduled_at)}</p>
    //     </div>
    //     <div className="mr-8 text-4xl">
    //         {formatScore(match.team2_score, match.winner === team2.team_id)}
    //     </div>
    //     <div className="flex flex-row gap-x-4">
    //         <h1
    //             className="cursor-pointer text-4xl"
    //             onClick={() => router.push(`/team/${team2.team_id}`)}
    //         >
    //             {team2.team_name}
    //         </h1>
    //         <img
    //             src={team2.team_logo}
    //             className="h-12 w-12 flex-shrink-0 rounded"
    //             onError={(e) => {
    //                 e.currentTarget.src = "/oss-logo-placeholder.png";
    //             }}
    //         />
    //     </div>
    // </div>
    // );
}
