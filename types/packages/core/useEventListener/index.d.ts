import type { Arrayable } from 'comuse-shared';
import type { MaybeRef, MaybeRefOrGetter } from 'vue';
import type { Fn } from '../types';
interface InferEventTarget<Events> {
    addEventListener: (event: Events, fn?: any, options?: any) => any;
    removeEventListener: (event: Events, fn?: any, options?: any) => any;
}
export interface GeneralEventListener<E = Event> {
    (evt: E): void;
}
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 *  Overload 1: Omitted Window target
 *  @param event
 *  @param listener
 *  @param options
 */
export declare function useEventListener<E extends keyof WindowEventMap>(event: MaybeRefOrGetter<Arrayable<E>>, listener: Arrayable<(this: Window, e: WindowEventMap[E]) => any>, options: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof WindowEventMap>(target: Window, event: MaybeRefOrGetter<Arrayable<E>>, listener: MaybeRef<Arrayable<(this: Window, ev: WindowEventMap[E]) => any>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof DocumentEventMap>(target: Document, event: MaybeRefOrGetter<Arrayable<E>>, listener: MaybeRef<Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Explicitly ShadowRoot target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof ShadowRootEventMap>(target: MaybeRefOrGetter<Arrayable<ShadowRoot> | null | undefined>, event: MaybeRefOrGetter<Arrayable<E>>, listener: MaybeRef<Arrayable<(this: ShadowRoot, ev: ShadowRootEventMap[E]) => any>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Explicitly HTMLElement target
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<E extends keyof HTMLElementEventMap>(target: MaybeRefOrGetter<Arrayable<HTMLElement> | null | undefined>, event: MaybeRefOrGetter<Arrayable<E>>, listener: MaybeRef<(this: HTMLElement, ev: HTMLElementEventMap[E]) => any>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 6: Custom event target with event type infer
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<Names extends string, EventType = Event>(target: MaybeRefOrGetter<Arrayable<InferEventTarget<Names>> | null | undefined>, event: MaybeRefOrGetter<Arrayable<Names>>, listener: MaybeRef<Arrayable<GeneralEventListener<EventType>>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 7: Custom event target fallback
 *
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export declare function useEventListener<EventType = Event>(target: MaybeRefOrGetter<Arrayable<EventTarget> | null | undefined>, event: MaybeRefOrGetter<Arrayable<string>>, listener: MaybeRef<Arrayable<GeneralEventListener<EventType>>>, options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>): Fn;
export {};
