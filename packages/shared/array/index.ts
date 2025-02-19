import type { Arrayable, Nullable } from 'rollup'
/**
 * Covert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export function toArray<T>(array: Nullable<Arrayable<T>>): Array<T> {
  return Array.isArray(array) ? array : [array]
}
