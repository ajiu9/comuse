import type { Arrayable, Nullable } from '../types';
/**
 * Covert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export declare function toArray<T>(array: Nullable<Arrayable<T>>): Array<T>;
