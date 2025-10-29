import type { MaybeRefOrGetter, ShallowRef } from 'vue';
import type { Pausable } from '../utils/types';
export interface UseIntervalOptions<Controls extends boolean> {
    /**
     * Expose more controls
     *
     * @default false
     */
    controls?: Controls;
    /**
     * Execute the update immediately on calling
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * Callback on every interval
     */
    callback?: (count: number) => void;
}
export interface UseIntervalControls {
    counter: ShallowRef<number>;
    reset: () => void;
}
export type UseIntervalReturn = Readonly<ShallowRef<number>> | Readonly<UseIntervalControls & Pausable>;
/**
 * Reactive counter increases on every interval
 *
 * @param interval
 * @param options
 */
export declare function useInterval(interval?: MaybeRefOrGetter<number>, options?: UseIntervalOptions<false>): Readonly<ShallowRef<number>>;
export declare function useInterval(interval: MaybeRefOrGetter<number>, options: UseIntervalOptions<true>): Readonly<UseIntervalControls & Pausable>;
