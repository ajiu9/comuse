import type { MaybeRefOrGetter } from 'vue';
import type { Fn } from '../types';
import type { Pausable } from '../utils/types';
export interface UseIntervalFnOptions {
    /**
     * start the timer immediately
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * execute the callback immediately
     *
     * @default false
     */
    immediateCallback?: boolean;
}
export type UseIntervalFnReturn = Pausable;
/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export declare function useIntervalFn(cb: Fn, interval?: MaybeRefOrGetter<number>, options?: UseIntervalFnOptions): UseIntervalFnReturn;
