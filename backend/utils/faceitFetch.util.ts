import fs from "fs";
import path from "path";
import { config } from "../config/env";
import { FaceitAPIMatch, FaceitAPIChampionship } from "./transformFaceitData";

interface faceitFetchOptions {
    readFileName?: string;
    writeFileName?: string;
    allow404?: boolean;
}

class FaceitApiError extends Error {
    status: number;
    statusText: string;
    endpoint: string;
    constructor(args: {
        status: number;
        statusText: string;
        endpoint: string;
    }) {
        super(`Faceit API error: ${args.status} ${args.statusText}`);
        this.name = "FaceitApiError";
        this.status = args.status;
        this.statusText = args.statusText;
        this.endpoint = args.endpoint;
    }
}

export const faceitFetchUtil = {
    baseUrl: "https://open.faceit.com/data/v4",
    DEBUG_DATA_DIR: path.join(__dirname, "..", "debug-data"),

    _callApi: async <T = any>(
        endpoint: string,
        queryParams?: Record<string, any>,
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
            throw new FaceitApiError({
                status: response.status,
                statusText: response.statusText,
                endpoint,
            });
        }
        return response.json() as Promise<T>;
    },

    _writeToFile: async (fileName?: string, data?: any): Promise<void> => {
        if (!fileName || data === undefined) return;
        const filePath = path.join(faceitFetchUtil.DEBUG_DATA_DIR, fileName);
        try {
            if (!fs.existsSync(faceitFetchUtil.DEBUG_DATA_DIR)) {
                fs.mkdirSync(faceitFetchUtil.DEBUG_DATA_DIR, {
                    recursive: true,
                });
            }
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`[DEBUG] Data written to: ${filePath}`);
        } catch (error) {
            console.error(`[DEBUG] Failed to write to file: ${error}`);
        }
    },

    _readFromFile: async <T = any>(
        fileName?: string,
    ): Promise<T | undefined> => {
        if (!fileName) return undefined;
        const filePath = path.join(faceitFetchUtil.DEBUG_DATA_DIR, fileName);
        if (!fs.existsSync(filePath)) {
            console.log(`[DEBUG] File not found: ${filePath}`);
            return undefined;
        }
        console.log(`[DEBUG] Reading from file: ${filePath}`);
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data) as T;
    },

    fetchData: async <T = any>(
        endpoint: string,
        options: faceitFetchOptions = {},
    ): Promise<T> => {
        const { readFileName, writeFileName, allow404 } = options;
        if (config.nodeEnv === "development") {
            const cachedData = await faceitFetchUtil._readFromFile<{
                items: T;
            }>(readFileName);
            if (cachedData) {
                return cachedData as T;
            }
        }
        try {
            console.log(`[Faceit API] Fetching data for endpoint: ${endpoint}`);
            const data = await faceitFetchUtil._callApi(endpoint);

            // Only write to file in development environment
            if (config.nodeEnv === "development") {
                await faceitFetchUtil._writeToFile(writeFileName, data);
            }

            return data as T;
        } catch (error) {
            if (
                allow404 &&
                error instanceof FaceitApiError &&
                error.status === 404
            ) {
                console.log(
                    `[Faceit API] ${endpoint} returned 404 (likely forfeit/no stats). Skipping.`,
                );
                return undefined as unknown as T;
            }
            console.error(`[Faceit API] Error fetching data:`, error);
            throw error;
        }
    },

    fetchMatchesData: async (
        championshipId: string,
        options: faceitFetchOptions = {},
    ): Promise<FaceitAPIMatch[]> => {
        const { readFileName, writeFileName } = options;

        // Only read from file in development environment
        if (config.nodeEnv === "development") {
            const cachedData = await faceitFetchUtil._readFromFile<{
                items: FaceitAPIMatch[];
            }>(readFileName);
            if (cachedData) {
                return cachedData.items;
            }
        }

        try {
            console.log(
                `[Faceit API] Fetching matches for championship: ${championshipId}`,
            );
            const data = await faceitFetchUtil._callApi(
                `championships/${championshipId}/matches`,
                {
                    limit: 100,
                },
            );

            // Only write to file in development environment
            if (config.nodeEnv === "development") {
                await faceitFetchUtil._writeToFile(writeFileName, data);
            }

            return data.items as FaceitAPIMatch[];
        } catch (error) {
            console.error(`[Faceit API] Error fetching matches data:`, error);
            throw error;
        }
    },
    fetchStageData: async (
        championshipId: string,
        options: faceitFetchOptions = {},
    ): Promise<FaceitAPIChampionship> => {
        const { readFileName, writeFileName } = options;

        // Only read from file in development environment
        if (config.nodeEnv === "development") {
            const cachedData =
                await faceitFetchUtil._readFromFile<FaceitAPIChampionship>(
                    readFileName,
                );
            if (cachedData) {
                return cachedData;
            }
        }

        try {
            console.log(
                `[Faceit API] Fetching championship data: ${championshipId}`,
            );
            const data = await faceitFetchUtil._callApi(
                `championships/${championshipId}`,
            );

            // Only write to file in development environment
            if (config.nodeEnv === "development") {
                await faceitFetchUtil._writeToFile(writeFileName, data);
            }

            return data;
        } catch (error) {
            console.error(
                `[Faceit API] Error fetching championship data:`,
                error,
            );
            throw error;
        }
    },
};
