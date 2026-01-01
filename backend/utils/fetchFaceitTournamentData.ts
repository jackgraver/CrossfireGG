import fs from "fs";
import path from "path";
import { config } from "../config/env";

interface FetchFaceitTournamentDataOptions {
    championshipId: string;
    queryParams?: Record<string, string | number>;
    debug?: {
        writeToFile?: boolean;
        readFromFile?: boolean;
        fileName?: string;
    };
}

interface FaceitApiResponse {
    items: any[];
    start: number;
    end: number;
}

const DEBUG_DATA_DIR = path.join(__dirname, "..", "debug-data");

export async function fetchFaceitTournamentData(
    options: FetchFaceitTournamentDataOptions
): Promise<FaceitApiResponse> {
    const { championshipId, queryParams = {}, debug = {} } = options;
    const {
        writeToFile = false,
        readFromFile = false,
        fileName = `faceit-${championshipId}-${Date.now()}.json`,
    } = debug;

    const debugFilePath = path.join(DEBUG_DATA_DIR, fileName);

    if (readFromFile) {
        console.log(`[DEBUG] Reading from file: ${debugFilePath}`);
        try {
            const data = fs.readFileSync(debugFilePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error(`[DEBUG] Failed to read from file: ${error}`);
            throw new Error(
                `Failed to read debug file: ${debugFilePath}. Make sure the file exists.`
            );
        }
    }

    const queryString = new URLSearchParams(
        queryParams as Record<string, string>
    ).toString();
    const url = `https://open.faceit.com/data/v4/championships/${championshipId}/matches${
        queryString ? `?${queryString}` : ""
    }`;

    console.log(`[Faceit API] Fetching: ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${config.faceit.apiKey}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Faceit API error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json() as FaceitApiResponse;

        if (writeToFile) {
            if (!fs.existsSync(DEBUG_DATA_DIR)) {
                fs.mkdirSync(DEBUG_DATA_DIR, { recursive: true });
            }
            fs.writeFileSync(debugFilePath, JSON.stringify(data, null, 2));
            console.log(`[DEBUG] Data written to: ${debugFilePath}`);
        }

        return data;
    } catch (error) {
        console.error(`[Faceit API] Error fetching data:`, error);
        throw error;
    }
}

