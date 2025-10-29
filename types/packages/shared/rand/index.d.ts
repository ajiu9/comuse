/**
 * Browser-side generation of uuid, using v4 method
 *
 * @example
 * ```ts
 * uuid() // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns - uuid
 */
export declare const uuid: () => string;
/**
 * Generating a random int in range [min, max)
 * @param max {number}
 * @param min {number}
 */
export declare const getRandom: (max: number, min?: number) => number;
