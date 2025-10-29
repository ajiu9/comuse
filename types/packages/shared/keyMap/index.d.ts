type KeyHandler = (event: KeyboardEvent, keyId: string) => any;
export declare class Keymap {
    private target;
    private map;
    private static readonly DEFAULT_TARGET;
    private static readonly keyCodeToKeyName;
    private static readonly aliases;
    getTarget(): string;
    getMap(): {
        [key: string]: {
            [key: string]: KeyHandler;
        };
    };
    constructor(element: HTMLElement);
    bind(key: string | string[], func: KeyHandler, target?: string): void;
    unbind(key: string | string[], target?: string): void;
    unbindTarget(target?: string): void;
    bindTarget(target?: string): void;
    install(element: HTMLElement): void;
    dispatch(event: KeyboardEvent, element: HTMLElement): any;
    private static normalize;
    static getNormalizedKey(key: string): string;
    getBindings(target: string): Record<string, KeyHandler>;
}
export {};
