import { api } from "@/api/client";
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
        queryFn: () => api.get<{ tournaments: any[] }>("/tournament/all"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const tournaments = data.data.tournaments;

    return (
        <div>
            <h1>Select Tournament</h1>
            <select
                id="tournament-select"
                value={selectedTournament || ""}
                onChange={(e) => setSelectedTournament(e.target.value || "")}
                className="text-text-primary bg-secondBg focus:border-thirdBg rounded-lg px-4 py-2 shadow-sm focus:outline-none"
            >
                {tournaments.map((tournament: any) => (
                    <option key={tournament.id} value={tournament.id}>
                        {tournament.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function extractFaceitIdFromLink(link: string): string | null {
    const match = link.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    return match ? match[0] : null;
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
    const [readFileName, setReadFileName] = useState("");
    const [writeFileName, setWriteFileName] = useState("");
    const [useFile, setUseFile] = useState(false);
    const [saveToFile, setSaveToFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const body = {
                tournamentId: Number(tournamentId),
                championshipId,
                ...(useFile && readFileName && { readFileName }),
                ...(saveToFile && {
                    writeFileName: writeFileName || undefined,
                }),
            };

            const result = await api.post("/faceit/import/stage", body);
            setResponse(result);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondBg rounded-lg p-4">
            <h3 className="mb-4 text-lg font-semibold">Import Stage</h3>
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
                {/* <BaseInput
                    onChange={(e) => setTournamentId(e.target.value)}
                    type="number"
                    placeholder="Tournament ID"
                    value={tournamentId}
                />
                <BaseInput
                    onChange={(e) => setChampionshipId(e.target.value)}
                    type="text"
                    placeholder="Championship ID"
                    value={championshipId}
                />
                {useFile && (
                    <BaseInput
                        onChange={(e) => setReadFileName(e.target.value)}
                        type="text"
                        placeholder="Read File Name (e.g., faceit_tournament_regseason.json)"
                        value={readFileName}
                    />
                )} */}
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
                {/* {saveToFile && (
                    <BaseInput
                        onChange={(e) => setWriteFileName(e.target.value)}
                        type="text"
                        placeholder="Write File Name (optional, auto-generated if empty)"
                        value={writeFileName}
                    />
                )} */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-firstBg hover:bg-secondBg rounded p-2 font-semibold text-white disabled:opacity-50"
                >
                    {loading ? "Importing..." : "Import Stage"}
                </button>
            </form>
            {response && (
                <div className="mt-4 rounded border border-green-500/30 bg-green-900/20 p-3">
                    <h4 className="mb-2 font-semibold">Response:</h4>
                    <pre className="overflow-auto text-sm">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div className="mt-4 rounded border border-red-500/30 bg-red-900/20 p-3">
                    <h4 className="mb-2 font-semibold text-red-400">Error:</h4>
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}

function ImportMatchesForm() {
    const [stageId, setStageId] = useState("");
    const [championshipId, setChampionshipId] = useState("");
    const [readFileName, setReadFileName] = useState("");
    const [writeFileName, setWriteFileName] = useState("");
    const [useFile, setUseFile] = useState(false);
    const [saveToFile, setSaveToFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const body = {
                stageId: Number(stageId),
                championshipId,
                ...(useFile && readFileName && { readFileName }),
                ...(saveToFile && {
                    writeFileName: writeFileName || undefined,
                }),
            };

            const result = await api.post("/faceit/import/matches", body);
            setResponse(result);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondBg rounded-lg p-4">
            <h3 className="mb-4 text-lg font-semibold">Import Matches</h3>
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
                {/* <BaseInput
                    onChange={(e) => setStageId(e.target.value)}
                    type="number"
                    placeholder="Stage ID"
                    value={stageId}
                />
                <BaseInput
                    onChange={(e) => setChampionshipId(e.target.value)}
                    type="text"
                    placeholder="Championship ID"
                    value={championshipId}
                />
                {useFile && (
                    <BaseInput
                        onChange={(e) => setReadFileName(e.target.value)}
                        type="text"
                        placeholder="Read File Name (e.g., faceit_matches_regseason.json)"
                        value={readFileName}
                    />
                )} */}
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
                {/* {saveToFile && (
                    <BaseInput
                        onChange={(e) => setWriteFileName(e.target.value)}
                        type="text"
                        placeholder="Write File Name (optional, auto-generated if empty)"
                        value={writeFileName}
                    />
                )} */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-firstBg hover:bg-secondBg rounded p-2 font-semibold text-white disabled:opacity-50"
                >
                    {loading ? "Importing..." : "Import Matches"}
                </button>
            </form>
            {response && (
                <div className="mt-4 rounded border border-green-500/30 bg-green-900/20 p-3">
                    <h4 className="mb-2 font-semibold">Response:</h4>
                    <pre className="overflow-auto text-sm">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div className="mt-4 rounded border border-red-500/30 bg-red-900/20 p-3">
                    <h4 className="mb-2 font-semibold text-red-400">Error:</h4>
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}
