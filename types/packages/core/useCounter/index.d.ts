import type { MaybeRef } from 'vue';
interface UseCounterOptions {
    min?: number;
    max?: number;
}
export declare function useCounter(initialValue?: MaybeRef<number>, options?: UseCounterOptions): {
    count: import("vue").Ref<number, number> | import("vue").ShallowRef<number, number> | import("vue").WritableComputedRef<number, number>;
    inc: (delta?: number) => number;
    dec: (delta?: number) => number;
    get: () => number;
    set: (value: number) => number;
    reset: (val?: number) => number;
};
export {};
