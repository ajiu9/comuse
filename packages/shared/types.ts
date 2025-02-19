export type AnyObject = Record<string, any>

export interface AnyFunction extends AnyObject {
  (...args: any[]): any
}

export type Nullable<T> = T | null | undefined

export type Arrayable<T> = T | Array<T>
