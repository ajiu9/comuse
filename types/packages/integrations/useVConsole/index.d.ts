export interface UseVConsoleOptions {
    debug: boolean;
    hostname: string[];
}
export declare function useVConsole(options?: Partial<UseVConsoleOptions>): Promise<import("vue").ShallowRef<any, any> | undefined>;
