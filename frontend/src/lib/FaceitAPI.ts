import type { Match } from "../types/Types";

const KEY = "";

export const fetchFaceit = async (): Promise<Match[]> => {
    try {
        const response = await fetch(
            "https://open.faceit.com/data/v4/championships/f56331e8-131a-4c50-b7db-eec8b010ff98/matches?limit=50",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${KEY}`,
                    Accept: "application/json",
                },
            }
        );
        const data = await response.json();
        return data.items; // <-- depends on your API shape, adjust accordingly
    } catch (err) {
        console.error("Fetch error:", err);
        return []; // Return empty array on error to keep type consistency
    }
};
