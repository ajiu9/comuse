export declare const now: () => number;
export declare const timestamp: () => number;
export declare function parseTime(time: any, fmt: string): string | null;
/**
 * Formats time based on the provided option.
 *
 * @param {number | string} time - The time value to format.
 * @param {string | undefined} fmt - Optional format string.
 * @returns {string} - Formatted time string.
 */
export declare function formatTime(time: number | string | Date, fmt?: string): string | null;
export declare const nowStr: (format?: string) => string | null;
