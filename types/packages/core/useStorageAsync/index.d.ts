import type { MaybeRefOrGetter } from 'vue';
import type { StorageLikeAsync } from '../ssr-handlers';
import type { RemovableRef } from '../types';
import type { SerializerAsync, UseStorageOptions } from '../useStorage';
export interface UseStorageAsyncOptions<T> extends Omit<UseStorageOptions<T>, 'serializer'> {
    /**
     * Custom data serialization
     */
    serializer?: SerializerAsync<T>;
    /**
     * On first value loaded hook.
     */
    onReady?: (value: T) => void;
}
export declare function useStorageAsync(key: string, initialValue: MaybeRefOrGetter<string>, storage?: StorageLikeAsync, options?: UseStorageAsyncOptions<string>): RemovableRef<string> & Promise<RemovableRef<string>>;
export declare function useStorageAsync(key: string, initialValue: MaybeRefOrGetter<boolean>, storage?: StorageLikeAsync, options?: UseStorageAsyncOptions<boolean>): RemovableRef<boolean> & Promise<RemovableRef<boolean>>;
export declare function useStorageAsync(key: string, initialValue: MaybeRefOrGetter<number>, storage?: StorageLikeAsync, options?: UseStorageAsyncOptions<number>): RemovableRef<number> & Promise<RemovableRef<number>>;
export declare function useStorageAsync<T>(key: string, initialValue: MaybeRefOrGetter<T>, storage?: StorageLikeAsync, options?: UseStorageAsyncOptions<T>): RemovableRef<T> & Promise<RemovableRef<T>>;
export declare function useStorageAsync<T = unknown>(key: string, initialValue: MaybeRefOrGetter<null>, storage?: StorageLikeAsync, options?: UseStorageAsyncOptions<T>): RemovableRef<T> & Promise<RemovableRef<T>>;
