import type { AnyFunction, AnyObject } from './types';
/**
 * addEvent() event delegate, supports multiple delegates
 *
 * @param element - js dom object
 * @param type - The event type. No need to add on
 * @param handler - callback method
 */
export declare function addEvent(element: AnyObject, type: string, handler: AnyFunction): void;
export declare namespace addEvent {
    var guid: number;
}
