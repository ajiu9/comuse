import type { EffectScope, InjectionKey } from 'vue'

export type LocalProvidedKey<T> = InjectionKey<T> | string | number
export type LocalProvidedState<T> = Record<LocalProvidedKey<T>, unknown>

// InstanceProxy is a proxy of ComponentPublicInstance
export type LocalProvidedOwner = any | EffectScope

export const localProvidedStateMap = new WeakMap<LocalProvidedOwner, LocalProvidedState<any>>()
