/**
 * Browser-side generation of uuid, using v4 method
 *
 * @example
 * ```ts
 * uuid() // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns - uuid
 */
export const uuid = (): string => {
  const temp = `${1e7}${-1e3}${-4e3}${-8e3}${-1e11}`
  return temp.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  )
}

/**
 * Generating a random int in range [min, max)
 * @param max {number}
 * @param min {number}
 */
export const getRandom = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min)) + min
