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
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["tournament_info"],
    //     queryFn: () => api.get<any>("/tournament/current_tournaments"),
    // });

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;
    // if (!data) return <div>No data</div>;

    // const current_tournaments: {
    //     current_tournament: any;
    //     current_regular_season: any;
    //     current_playoffs: any;
    // } = data;

    // if (!current_tournaments) {
    //     return;
    // }

    return (
        <div className="flex flex-col gap-6">
            <h1>Manage Tournaments</h1>
            {/* <SelectTournament />
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
            </button> */}
            <FaceitImportSection />
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
                    <option key={tournament.ID} value={tournament.ID}>
                        {tournament.name}
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

function FaceitImportSection() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Faceit Import</h2>
            <ImportStageForm />
            <ImportMatchesForm />
        </div>
    );
}

function ImportStageForm() {
    const [tournamentId, setTournamentId] = useState("");
    const [championshipId, setChampionshipId] = useState("");
    const [fileName, setFileName] = useState("");
    const [useFile, setUseFile] = useState(false);
    const [saveToFile, setSaveToFile] = useState(false);
    const [saveFileName, setSaveFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const endpoint = useFile
                ? "/tournament/faceit/import/stage-file"
                : "/tournament/faceit/import/stage";
            const body = useFile
                ? { tournamentId: Number(tournamentId), fileName }
                : {
                      tournamentId: Number(tournamentId),
                      championshipId,
                      ...(saveToFile && { saveToFile: true, saveFileName: saveFileName || undefined }),
                  };

            const result = await api.post(endpoint, body);
            setResponse(result);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondBg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Import Stage</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="use-file-stage"
                        checked={useFile}
                        onChange={(e) => setUseFile(e.target.checked)}
                        className="rounded"
                    />
                    <label htmlFor="use-file-stage" className="text-sm">
                        Import from file
                    </label>
                </div>
                <BaseInput
                    onChange={(e) => setTournamentId(e.target.value)}
                    type="number"
                    placeholder="Tournament ID"
                    value={tournamentId}
                />
                {useFile ? (
                    <BaseInput
                        onChange={(e) => setFileName(e.target.value)}
                        type="text"
                        placeholder="File Name (e.g., faceit_tournament_regseason.json)"
                        value={fileName}
                    />
                ) : (
                    <>
                        <BaseInput
                            onChange={(e) => setChampionshipId(e.target.value)}
                            type="text"
                            placeholder="Championship ID"
                            value={championshipId}
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="save-to-file-stage"
                                checked={saveToFile}
                                onChange={(e) => setSaveToFile(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="save-to-file-stage" className="text-sm">
                                Save to file
                            </label>
                        </div>
                        {saveToFile && (
                            <BaseInput
                                onChange={(e) => setSaveFileName(e.target.value)}
                                type="text"
                                placeholder="Save File Name (optional, auto-generated if empty)"
                                value={saveFileName}
                            />
                        )}
                    </>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-firstBg hover:bg-secondBg disabled:opacity-50 rounded p-2 font-semibold text-white"
                >
                    {loading ? "Importing..." : "Import Stage"}
                </button>
            </form>
            {response && (
                <div className="mt-4 p-3 bg-green-900/20 rounded border border-green-500/30">
                    <h4 className="font-semibold mb-2">Response:</h4>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-900/20 rounded border border-red-500/30">
                    <h4 className="font-semibold mb-2 text-red-400">Error:</h4>
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}

function ImportMatchesForm() {
    const [stageId, setStageId] = useState("");
    const [championshipId, setChampionshipId] = useState("");
    const [fileName, setFileName] = useState("");
    const [useFile, setUseFile] = useState(false);
    const [saveToFile, setSaveToFile] = useState(false);
    const [saveFileName, setSaveFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const endpoint = useFile
                ? "/tournament/faceit/import/matches-file"
                : "/tournament/faceit/import/matches";
            const body = useFile
                ? { stageId: Number(stageId), fileName }
                : {
                      stageId: Number(stageId),
                      championshipId,
                      ...(saveToFile && { saveToFile: true, saveFileName: saveFileName || undefined }),
                  };

            const result = await api.post(endpoint, body);
            setResponse(result);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondBg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Import Matches</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="use-file-matches"
                        checked={useFile}
                        onChange={(e) => setUseFile(e.target.checked)}
                        className="rounded"
                    />
                    <label htmlFor="use-file-matches" className="text-sm">
                        Import from file
                    </label>
                </div>
                <BaseInput
                    onChange={(e) => setStageId(e.target.value)}
                    type="number"
                    placeholder="Stage ID"
                    value={stageId}
                />
                {useFile ? (
                    <BaseInput
                        onChange={(e) => setFileName(e.target.value)}
                        type="text"
                        placeholder="File Name (e.g., faceit_matches_regseason.json)"
                        value={fileName}
                    />
                ) : (
                    <>
                        <BaseInput
                            onChange={(e) => setChampionshipId(e.target.value)}
                            type="text"
                            placeholder="Championship ID"
                            value={championshipId}
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="save-to-file-matches"
                                checked={saveToFile}
                                onChange={(e) => setSaveToFile(e.target.checked)}
                                className="rounded"
                            />
                            <label htmlFor="save-to-file-matches" className="text-sm">
                                Save to file
                            </label>
                        </div>
                        {saveToFile && (
                            <BaseInput
                                onChange={(e) => setSaveFileName(e.target.value)}
                                type="text"
                                placeholder="Save File Name (optional, auto-generated if empty)"
                                value={saveFileName}
                            />
                        )}
                    </>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-firstBg hover:bg-secondBg disabled:opacity-50 rounded p-2 font-semibold text-white"
                >
                    {loading ? "Importing..." : "Import Matches"}
                </button>
            </form>
            {response && (
                <div className="mt-4 p-3 bg-green-900/20 rounded border border-green-500/30">
                    <h4 className="font-semibold mb-2">Response:</h4>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-900/20 rounded border border-red-500/30">
                    <h4 className="font-semibold mb-2 text-red-400">Error:</h4>
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}
