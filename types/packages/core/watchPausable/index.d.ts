import type { WatchCallback, WatchSource, WatchStopHandle } from 'vue';
import type { MapOldSources, MapSources, Pausable, PausableFilterOptions } from '../utils';
import type { WatchWithFilterOptions } from '../watchWithFilter';
export interface WatchPausableReturn extends Pausable {
    stop: WatchStopHandle;
}
export type WatchPausableOptions<Immediate> = WatchWithFilterOptions<Immediate> & PausableFilterOptions;
export declare function watchPausable<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(sources: [...T], cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>, options?: WatchPausableOptions<Immediate>): WatchPausableReturn;
export declare function watchPausable<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchPausableOptions<Immediate>): WatchPausableReturn;
export declare function watchPausable<T extends object, Immediate extends Readonly<boolean> = false>(source: T, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchPausableOptions<Immediate>): WatchPausableReturn;
export { watchPausable as pausableWatch };
