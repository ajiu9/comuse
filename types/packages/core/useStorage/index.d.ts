import type { Awaitable } from 'comuse-shared';
import type { MaybeRefOrGetter } from 'vue';
import type { ConfigurableWindow } from '../_configurable';
import type { StorageLike } from '../ssr-handlers';
import type { ConfigurableFlush, RemovableRef } from '../types';
import type { ConfigurableEventFilter } from '../utils/filters';
export interface Serializer<T> {
    read: (raw: string) => T;
    write: (value: T) => string;
}
export interface SerializerAsync<T> {
    read: (raw: string) => Awaitable<T>;
    write: (value: T) => Awaitable<string>;
}
export declare const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date', Serializer<any>>;
export declare const customStorageEventName = "comuse-storage";
export interface StorageEventLike {
    storageArea: StorageLike | null;
    key: StorageEvent['key'];
    oldValue: StorageEvent['oldValue'];
    newValue: StorageEvent['newValue'];
}
export interface UseStorageOptions<T> extends ConfigurableEventFilter, ConfigurableWindow, ConfigurableFlush {
    /**
     * Watch for deep changes
     *
     * @default true
     */
    deep?: boolean;
    /**
     * Listen to storage changes, useful for multiple tabs application
     *
     * @default true
     */
    listenToStorageChanges?: boolean;
    /**
     * Write the default value to the storage when it does not exist
     *
     * @default true
     */
    writeDefaults?: boolean;
    /**
     * Merge the default value with the value read from the storage.
     *
     * When setting it to true, it will perform a **shallow merge** for objects.
     * You can pass a function to perform custom merge (e.g. deep merge), for example:
     *
     * @default false
     */
    mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);
    /**
     * Custom data serialization
     */
    serializer?: Serializer<T>;
    /**
     * On error callback
     *
     * Default log error to `console.error`
     */
    onError?: (error: unknown) => void;
    /**
     * Use shallow ref as reference
     *
     * @default false
     */
    shallow?: boolean;
    /**
     * Wait for the component to be mounted before reading the storage.
     *
     * @default false
     */
    initOnMounted?: boolean;
}
export declare function useStorage(key: MaybeRefOrGetter<string>, defaults: MaybeRefOrGetter<string>, storage?: StorageLike, options?: UseStorageOptions<string>): RemovableRef<string>;
export declare function useStorage(key: MaybeRefOrGetter<string>, defaults: MaybeRefOrGetter<boolean>, storage?: StorageLike, options?: UseStorageOptions<boolean>): RemovableRef<boolean>;
export declare function useStorage(key: MaybeRefOrGetter<string>, defaults: MaybeRefOrGetter<number>, storage?: StorageLike, options?: UseStorageOptions<number>): RemovableRef<number>;
export declare function useStorage<T>(key: MaybeRefOrGetter<string>, defaults: MaybeRefOrGetter<T>, storage?: StorageLike, options?: UseStorageOptions<T>): RemovableRef<T>;
export declare function useStorage<T = unknown>(key: MaybeRefOrGetter<string>, defaults: MaybeRefOrGetter<null>, storage?: StorageLike, options?: UseStorageOptions<T>): RemovableRef<T>;
