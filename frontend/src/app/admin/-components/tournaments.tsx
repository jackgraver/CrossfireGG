import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import OSSForm from "@/shared/OSSForm/OSSForm";
import SelectInput from "@/shared/OSSForm/SelectInput/SelectInput";
import { toastService } from "@/shared/toast/toastService";
import TournamentSelector from "@/shared/TournamentSelector";
import { Tournament } from "@/types/TournamentModel";
import { PromiseReturn } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ManageTournaments() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tournament_info"],
        queryFn: () => api.get<any>("/tournament/current_tournaments"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const current_tournaments: {
        current_tournament: any;
        current_regular_season: any;
        current_playoffs: any;
    } = data;

    if (!current_tournaments) {
        return;
    }

    return (
        <div>
            <h1>Manage Tournaments</h1>
            <SelectTournament />
            <button
                className="bg-firstBg hover:bg-secondBg mt-2 rounded p-2 font-semibold text-white"
                onClick={() =>
                    toastService.display({
                        title: "New Tournament",
                        body: <NewTournamentToast />,
                        variant: "center",
                        durationMs: -1,
                    })
                }
            >
                New Tournament
            </button>
        </div>
    );
}

function SelectTournament() {
    const [selectedTournament, setSelectedTournament] = useState<string>("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["all_tournaments"],
        queryFn: () =>
            api.get<{ tournaments: Tournament[] }>("/tournament/all"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const tournaments = data.tournaments;

    return (
        <div>
            <h1>Select Tournament</h1>
            <select
                id="tournament-select"
                value={selectedTournament || ""}
                onChange={(e) => setSelectedTournament(e.target.value || "")}
                className="text-text-primary bg-secondBg focus:border-thirdBg rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            >
                {tournaments.map((tournament: Tournament) => (
                    <option key={tournament.t_id} value={tournament.t_id}>
                        {tournament.t_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function extractFaceitIdFromLink(link: string): string | null {
    const match = link.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    );
    return match ? match[0] : null;
}

function NewTournamentToast() {
    const [tournamentLink, setTournamentLink] = useState("");
    const [tournamentName, setTournamentName] = useState("");

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        console.log(tournamentLink, tournamentName);
        try {
            const response: { team_id: string } = await api.post(
                "/tournament/create",
                {
                    tournament_id: extractFaceitIdFromLink(tournamentLink),
                    tournament_name: tournamentName,
                },
            );
            localStorage.setItem("team_id", response.team_id);
            return { success: true, result: response.team_id };
        } catch (err) {
            console.error("Submission error:", err);
            return { success: false, result: null };
        }
    };

    return (
        <div>
            <h1>New Tournament</h1>
            <OSSForm onSubmit={handleSubmit} onSuccess={() => {}}>
                <BaseInput
                    onChange={(e) => setTournamentLink(e.target.value)}
                    type="text"
                    placeholder="Tournament Link"
                />
                <BaseInput
                    onChange={(e) => setTournamentName(e.target.value)}
                    type="text"
                    placeholder="Tournament Name"
                />
                {/* <SelectInput
                    placeholder="Current Stage"
                    options={["REGULAR SEASON", "PLAYOFFS"]}
                    value="REGULAR SEASON"
                    onChange={function (value: string): void {
                        throw new Error("Function not implemented.");
                    }}
                /> */}
                <h1>Stage/End</h1>
            </OSSForm>
        </div>
    );
}
