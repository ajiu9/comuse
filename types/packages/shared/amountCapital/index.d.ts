/**
 * Converts a number to its Chinese capital representation.
 * @param {number | null | undefined | string} n - The number to convert.
 * @returns {string | void} - The Chinese capital representation of the number, or `void` if the input is invalid.
 */
type T = number | null | undefined | `${number}` | '';
export declare function amountCapital(n: T): string | void;
export {};
