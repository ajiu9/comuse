import type { AnimationConfig, AnimationObject, TemplateFunction, TimingFunction } from './types';
export declare class Animation {
    object: AnimationObject;
    property: string;
    startValue: number;
    endValue: number;
    duration: number;
    delay: number;
    timingFunction: TimingFunction;
    template: TemplateFunction;
    constructor(config: AnimationConfig);
    receiveTime(time: number): void;
}
