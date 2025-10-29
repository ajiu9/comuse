import type { ConfigurableWindow } from '../_configurable';
import type { MaybeRefOrGetter } from '../types';
import type { Pausable } from '../utils/types';
export interface UseRafFnCallbackArguments {
    /**
     * Time elapsed between this and the last frame.
     */
    delta: number;
    /**
     * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
}
export interface UseRafFnOptions extends ConfigurableWindow {
    /**
     * Start the requestAnimationFrame loop immediately on creation
     *
     * @default true
     */
    immediate?: boolean;
    /**
     * The maximum frame per second to execute the function.
     * Set to `undefined` to disable the limit.
     *
     * @default undefined
     */
    fpsLimit?: MaybeRefOrGetter<number>;
}
/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @see https://ajiu9.cn/comuse/useRafFn
 * @param fn
 * @param options
 */
export declare function useRafFn(fn: (args: UseRafFnCallbackArguments) => void, options?: UseRafFnOptions): Pausable;
