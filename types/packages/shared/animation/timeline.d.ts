import type { Animation, TimelineState } from './types';
declare const TICK: unique symbol;
declare const TICK_HANDLER: unique symbol;
declare const ANIMATIONS: unique symbol;
declare const START_TIME: unique symbol;
declare const PAUSE_START: unique symbol;
declare const PAUSE_TIME: unique symbol;
export declare class TimeLine {
    state: TimelineState;
    private [TICK];
    private [TICK_HANDLER];
    private [ANIMATIONS];
    private [START_TIME];
    private [PAUSE_START];
    private [PAUSE_TIME];
    constructor();
    start(): void;
    add(animation: Animation, startTime?: number): void;
    pause(): void;
    resume(): void;
    reset(): void;
    getState(): TimelineState;
}
export {};
