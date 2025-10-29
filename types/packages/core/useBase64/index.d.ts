import type { MaybeRefOrGetter, ShallowRef } from 'vue';
export interface UseBase64Options {
    /**
     * Output as Data URL format
     *
     * @default true
     */
    dataUrl?: boolean;
}
export interface ToDataURLOptions extends UseBase64Options {
    /**
     * MIME type
     */
    type?: string | undefined;
    /**
     * Image quality of jpeg or webp
     */
    quality?: any;
}
export interface UseBase64ObjectOptions<T> extends UseBase64Options {
    serializer?: (v: T) => string;
}
export interface UseBase64Return {
    base64: ShallowRef<string>;
    promise: ShallowRef<Promise<string>>;
    execute: () => Promise<string>;
}
export declare function useBase64(target: MaybeRefOrGetter<string | undefined>, options?: UseBase64Options): UseBase64Return;
export declare function useBase64(target: MaybeRefOrGetter<Blob | undefined>, options?: UseBase64Options): UseBase64Return;
export declare function useBase64(target: MaybeRefOrGetter<ArrayBuffer | undefined>, options?: UseBase64Options): UseBase64Return;
export declare function useBase64(target: MaybeRefOrGetter<HTMLCanvasElement | undefined>, options?: ToDataURLOptions): UseBase64Return;
export declare function useBase64(target: MaybeRefOrGetter<HTMLImageElement | undefined>, options?: ToDataURLOptions): UseBase64Return;
export declare function useBase64<T extends Record<string, unknown>>(target: MaybeRefOrGetter<T>, options?: UseBase64ObjectOptions<T>): UseBase64Return;
export declare function useBase64<T extends Map<string, unknown>>(target: MaybeRefOrGetter<T>, options?: UseBase64ObjectOptions<T>): UseBase64Return;
export declare function useBase64<T extends Set<unknown>>(target: MaybeRefOrGetter<T>, options?: UseBase64ObjectOptions<T>): UseBase64Return;
export declare function useBase64<T>(target: MaybeRefOrGetter<T[]>, options?: UseBase64ObjectOptions<T[]>): UseBase64Return;
