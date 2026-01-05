import fs from "fs";
import path from "path";
import { config } from "../config/env";
import { FaceitAPIMatch, FaceitAPIChampionship } from "./transformFaceitData";

interface faceitFetchOptions {
    readFileName?: string;
    writeFileName?: string;
}

export const faceitFetchUtil = {
    baseUrl: "https://open.faceit.com/data/v4",
    DEBUG_DATA_DIR: path.join(__dirname, "..", "debug-data"),

    _callApi: async <T = any>(
        endpoint: string,
        queryParams?: Record<string, any>
    ): Promise<T> => {
        let url = `${faceitFetchUtil.baseUrl}/${endpoint.replace(/^\//, "")}`;

        if (queryParams && Object.keys(queryParams).length > 0) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(queryParams)) {
                if (Array.isArray(value)) {
                    value.forEach((val) => params.append(key, String(val)));
                } else if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            }
            const paramString = params.toString();
            if (paramString.length > 0) {
                url += `?${paramString}`;
            }
        }

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
        return response.json() as Promise<T>;
    },

    _writeToFile: async (fileName: string, data: any): Promise<void> => {
        if (!fs.existsSync(faceitFetchUtil.DEBUG_DATA_DIR)) {
            fs.mkdirSync(faceitFetchUtil.DEBUG_DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(
            path.join(faceitFetchUtil.DEBUG_DATA_DIR, fileName),
            JSON.stringify(data, null, 2)
        );
    },

    _readFromFile: async (fileName: string): Promise<any> => {
        const data = fs.readFileSync(
            path.join(faceitFetchUtil.DEBUG_DATA_DIR, fileName),
            "utf-8"
        );
        return JSON.parse(data);
    },

    fetchMatchesData: async (
        championshipId: string,
        options: faceitFetchOptions = {}
    ): Promise<FaceitAPIMatch[]> => {
        const { readFileName, writeFileName } = options;

        if (readFileName) {
            const readFilePath = path.join(
                faceitFetchUtil.DEBUG_DATA_DIR,
                readFileName
            );
            console.log(`[DEBUG] Reading matches from file: ${readFilePath}`);
            try {
                const data = await faceitFetchUtil._readFromFile(readFileName);
                return data.items as FaceitAPIMatch[];
            } catch (error) {
                console.error(`[DEBUG] Failed to read from file: ${error}`);
                throw new Error(
                    `Failed to read debug file: ${readFilePath}. Make sure the file exists.`
                );
            }
        }

        try {
            console.log(
                `[Faceit API] Fetching matches for championship: ${championshipId}`
            );
            const data = await faceitFetchUtil._callApi(
                `championships/${championshipId}/matches`,
                { limit: 100 }
            );

            if (writeFileName) {
                const writeFilePath = path.join(
                    faceitFetchUtil.DEBUG_DATA_DIR,
                    writeFileName
                );
                try {
                    await faceitFetchUtil._writeToFile(writeFileName, data);
                    console.log(
                        `[DEBUG] Matches data written to: ${writeFilePath}`
                    );
                } catch (error) {
                    console.error(`[DEBUG] Failed to write to file: ${error}`);
                }
            }

            return data as FaceitAPIMatch[];
        } catch (error) {
            console.error(`[Faceit API] Error fetching matches data:`, error);
            throw error;
        }
    },
    fetchStageData: async (
        championshipId: string,
        options: faceitFetchOptions = {}
    ): Promise<FaceitAPIChampionship> => {
        const { readFileName, writeFileName } = options;

        if (readFileName) {
            const readFilePath = path.join(
                faceitFetchUtil.DEBUG_DATA_DIR,
                readFileName
            );
            console.log(
                `[DEBUG] Reading championship from file: ${readFilePath}`
            );
            try {
                const data = await faceitFetchUtil._readFromFile(readFileName);
                return data as FaceitAPIChampionship;
            } catch (error) {
                console.error(`[DEBUG] Failed to read from file: ${error}`);
                throw new Error(
                    `Failed to read debug file: ${readFilePath}. Make sure the file exists.`
                );
            }
        }

        try {
            console.log(
                `[Faceit API] Fetching championship data: ${championshipId}`
            );
            const data = await faceitFetchUtil._callApi(
                `championships/${championshipId}`
            );

            if (writeFileName) {
                const writeFilePath = path.join(
                    faceitFetchUtil.DEBUG_DATA_DIR,
                    writeFileName
                );
                try {
                    await faceitFetchUtil._writeToFile(writeFileName, data);
                    console.log(
                        `[DEBUG] Championship data written to: ${writeFilePath}`
                    );
                } catch (error) {
                    console.error(`[DEBUG] Failed to write to file: ${error}`);
                }
            }

            return data;
        } catch (error) {
            console.error(
                `[Faceit API] Error fetching championship data:`,
                error
            );
            throw error;
        }
    },
};
