import type { Awaitable } from 'comuse-shared';
import type { MaybeElementRef } from './types';
export interface StorageLikeAsync {
    getItem: (key: string) => Awaitable<string | null>;
    setItem: (key: string, value: string) => Awaitable<void>;
    removeItem: (key: string) => Awaitable<void>;
}
export interface StorageLike {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}
export interface SSRHandlersMap {
    getDefaultStorage: () => StorageLike | undefined;
    getDefaultStorageAsync: () => StorageLikeAsync | undefined;
    updateHTMLAttrs: (selector: string | MaybeElementRef, attribute: string, value: string) => void;
}
export declare function getSSRHandler<T extends keyof SSRHandlersMap>(key: T, fallback: SSRHandlersMap[T]): SSRHandlersMap[T];
export declare function getSSRHandler<T extends keyof SSRHandlersMap>(key: T, fallback: SSRHandlersMap[T] | undefined): SSRHandlersMap[T] | undefined;
export declare function setSSRHandler<T extends keyof SSRHandlersMap>(key: T, fn: SSRHandlersMap[T]): void;
