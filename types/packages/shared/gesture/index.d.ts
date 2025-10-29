export interface GestureRecognizer {
    start: (point: MouseEvent | Touch, context: GestureContext) => void;
    move: (point: MouseEvent | Touch, context: GestureContext) => void;
    end: (point: MouseEvent | Touch, context: GestureContext) => void;
    cancel: (point: MouseEvent | Touch, context: GestureContext) => void;
}
interface GestureContext {
    startX?: number;
    startY?: number;
    points?: {
        t: number;
        x: number;
        y: number;
    }[];
    isTap?: boolean;
    isPan?: boolean;
    isPress?: boolean;
    isVertical?: boolean;
    handler?: number | null;
    isFlick?: boolean;
}
export declare class Listener {
    private element;
    private recognizer;
    private isListeningMouse;
    private contexts;
    constructor(element: Element, recognizer: GestureRecognizer);
    private setupMouseListeners;
    private setupTouchListeners;
}
export declare class Recognizer {
    private dispatcher;
    constructor(dispatcher: Dispatcher);
    start(point: MouseEvent | Touch, context: GestureContext): void;
    move(point: MouseEvent | Touch, context: GestureContext): void;
    end(point: MouseEvent | Touch, context: GestureContext): void;
    cancel(point: MouseEvent | Touch, context: GestureContext): void;
}
export declare class Dispatcher {
    private element;
    constructor(element: Element);
    dispatch(type: string, properties: Record<string, any>): void;
}
export declare function enableGesture(element: Element): void;
export {};
