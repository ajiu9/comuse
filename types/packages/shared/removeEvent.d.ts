import type { AnyFunction, AnyObject } from './types';
/**
 * removeEvent removes the event delegate created by addEvent
 *
 * @param element - js dom object
 * @param type - The type of the event. No need to add on
 * @param handler - Callback method.
 */
declare function removeEvent(element: AnyObject, type: string, handler: AnyFunction): void;
export { removeEvent, removeEvent as default, };
