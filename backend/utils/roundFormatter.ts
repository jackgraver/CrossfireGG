/**
 * Utilities for formatting match rounds based on stage format type
 */

export type StageFormat = 'swiss' | 'single-elimination' | 'double-elimination' | 'roundRobin' | 'unknown';

/**
 * Calculate team record from matches in a Swiss system
 * This helps determine which bracket a team is in (e.g., 1-0, 0-1, 2-0, 1-1, 0-2, etc.)
 */
export function calculateSwissRecord(wins: number, losses: number): string {
    return `${wins}-${losses}`;
}

/**
 * Format round label for Swiss format
 * In Swiss, we need to know both the round number and the record
 * 
 * @param round - The round number (1-5 typically)
 * @param wins - Number of wins for the team
 * @param losses - Number of losses for the team
 * @returns Formatted string like "Round 2 (1-0)" or "Round 3 (2-0)"
 */
export function formatSwissRound(round: number, wins?: number, losses?: number): string {
    const baseRound = `Round ${round}`;
    if (wins !== undefined && losses !== undefined) {
        return `${baseRound} (${calculateSwissRecord(wins, losses)})`;
    }
    return baseRound;
}

/**
 * Format round label for single elimination bracket
 * Maps round numbers to readable names (Quarters, Semis, Finals, etc.)
 * 
 * @param round - The round number
 * @param totalTeams - Total teams in the bracket (helps determine structure)
 * @returns Formatted string like "Quarterfinals", "Semifinals", "Grand Final"
 */
export function formatSingleEliminationRound(round: number, totalTeams: number = 32): string {
    // Calculate total rounds needed
    const totalRounds = Math.ceil(Math.log2(totalTeams));
    
    // Count from the final backwards
    const roundsFromFinal = totalRounds - round + 1;
    
    switch (roundsFromFinal) {
        case 1:
            return 'Grand Final';
        case 2:
            return 'Semifinals';
        case 3:
            return 'Quarterfinals';
        case 4:
            return 'Round of 16';
        case 5:
            return 'Round of 32';
        default:
            if (roundsFromFinal > 5) {
                const teamsInRound = Math.pow(2, roundsFromFinal);
                return `Round of ${teamsInRound}`;
            }
            return `Round ${round}`;
    }
}

/**
 * Format round label for double elimination bracket
 * Includes upper bracket, lower bracket, and grand finals
 * 
 * @param round - The round number
 * @param bracket - Which bracket (upper/lower)
 * @param totalTeams - Total teams in the bracket
 * @returns Formatted string like "Upper Bracket - Semifinals"
 */
export function formatDoubleEliminationRound(
    round: number,
    bracket: 'upper' | 'lower' | 'grand-final' = 'upper',
    totalTeams: number = 32
): string {
    if (bracket === 'grand-final') {
        return 'Grand Final';
    }
    
    const baseLabel = formatSingleEliminationRound(round, totalTeams);
    const bracketLabel = bracket === 'upper' ? 'Upper Bracket' : 'Lower Bracket';
    
    return `${bracketLabel} - ${baseLabel}`;
}

/**
 * Format round label for round-robin format
 * Simple round numbering
 * 
 * @param round - The round number
 * @returns Formatted string like "Round 1", "Round 2"
 */
export function formatRoundRobinRound(round: number): string {
    return `Round ${round}`;
}

/**
 * Main function to format round based on stage format type
 * 
 * @param format - The stage format type
 * @param round - The round number
 * @param options - Additional options for formatting (wins, losses, bracket, totalTeams)
 * @returns Formatted round string
 */
export function formatRound(
    format: StageFormat,
    round: number,
    options?: {
        wins?: number;
        losses?: number;
        bracket?: 'upper' | 'lower' | 'grand-final';
        totalTeams?: number;
    }
): string {
    switch (format) {
        case 'swiss':
            return formatSwissRound(round, options?.wins, options?.losses);
        case 'single-elimination':
            return formatSingleEliminationRound(round, options?.totalTeams);
        case 'double-elimination':
            return formatDoubleEliminationRound(round, options?.bracket, options?.totalTeams);
        case 'roundRobin':
            return formatRoundRobinRound(round);
        default:
            return `Round ${round}`;
    }
}

/**
 * Map FaceIT format types to our internal format enum
 */
export function mapFaceitFormatType(faceitType: string): StageFormat {
    const formatMap: Record<string, StageFormat> = {
        'swiss': 'swiss',
        'single elimination': 'single-elimination',
        'singleElimination': 'single-elimination',
        'double elimination': 'double-elimination',
        'doubleElimination': 'double-elimination',
        'roundRobin': 'roundRobin',
        'round robin': 'roundRobin',
        'championship': 'swiss', // FaceIT often uses "championship" for swiss
    };
    
    return formatMap[faceitType.toLowerCase()] || 'unknown';
}

/**
 * Parse a formatted round string back to its components
 * Useful for reverse operations or validation
 */
export function parseRoundString(roundStr: string): {
    round: number | null;
    wins?: number;
    losses?: number;
    label?: string;
} {
    // Try to match "Round X (Y-Z)" pattern for Swiss
    const swissMatch = roundStr.match(/Round (\d+) \((\d+)-(\d+)\)/);
    if (swissMatch) {
        return {
            round: parseInt(swissMatch[1]),
            wins: parseInt(swissMatch[2]),
            losses: parseInt(swissMatch[3]),
        };
    }
    
    // Try to match "Round X" pattern
    const simpleMatch = roundStr.match(/Round (\d+)/);
    if (simpleMatch) {
        return {
            round: parseInt(simpleMatch[1]),
        };
    }
    
    // For named rounds like "Semifinals", "Grand Final", etc.
    return {
        round: null,
        label: roundStr,
    };
}

