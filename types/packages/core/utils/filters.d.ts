import type { AnyFn } from 'comuse-shared';
import type { MaybeRefOrGetter } from '../types';
import type { ArgumentsType, Pausable, Promisify } from './types';
export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
    fn: FunctionArgs<Args, This>;
    args: Args;
    thisArg: This;
}
export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (invoke: Invoke, options: FunctionWrapperOptions<Args, This>) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>;
export interface DebounceFilterOptions {
    /**
     * The maximum time allowed to be delayed before it's invoked.
     * In milliseconds.
     */
    maxWait?: number;
    /**
     * Whether to reject the last call if it's been cancel.
     *
     * @default false
     */
    rejectOnCancel?: boolean;
}
export interface ConfigurableEventFilter {
    /**
     * Filter for if events should to be received.
     *
     * @see https://vueuse.org/guide/config.html#event-filters
     */
    eventFilter?: EventFilter;
}
export interface ThrottleFilterOptions {
    /**
     * The maximum time allowed to be delayed before it's invoked.
     */
    delay: number;
    /**
     * Whether to invoke on the trailing edge of the timeout.
     */
    trailing?: boolean;
    /**
     * Whether to invoke on the leading edge of the timeout.
     */
    leading?: boolean;
    /**
     * Whether to reject the last call if it's been cancel.
     */
    rejectOnCancel?: boolean;
}
/**
 * @internal
 */
export declare function createFilterWrapper<T extends AnyFn>(filter: EventFilter, fn: T): (this: any, ...args: ArgumentsType<T>) => Promise<Awaited<ReturnType<T>>>;
export declare const bypassFilter: EventFilter;
/**
 * Create an EventFilter that debounce the events
 */
export declare function debounceFilter(ms: MaybeRefOrGetter<number>, options?: DebounceFilterOptions): EventFilter<any[], any, AnyFn>;
/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing]
 * @param [leading]
 * @param [rejectOnCancel]
 */
export declare function throttleFilter(ms: MaybeRefOrGetter<number>, trailing?: boolean, leading?: boolean, rejectOnCancel?: boolean): EventFilter;
export declare function throttleFilter(options: ThrottleFilterOptions): EventFilter;
export interface PausableFilterOptions {
    /**
     * The initial state
     *
     * @default 'active'
     */
    initialState?: 'active' | 'paused';
}
/**
 * EventFilter that gives extra controls to pause and resume the filter
 *
 * @param extendFilter  Extra filter to apply when the PausableFilter is active, default to none
 * @param options Options to configure the filter
 */
export declare function pausableFilter(extendFilter?: EventFilter, options?: PausableFilterOptions): Pausable & {
    eventFilter: EventFilter;
};
