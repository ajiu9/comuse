import type { Plugin } from 'vite';
export declare function markdownTransform(): Plugin;
export declare function getFunctionMarkdown(pkg: string, name: string): Promise<{
    footer: string;
    header: string;
}>;
export declare function replacer(code: string, value: string, key: string, insert?: 'head' | 'tail' | 'none'): string;
