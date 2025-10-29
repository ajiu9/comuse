import type { PackageIndexes } from 'comuse-metadata';
export declare const DIR_PACKAGE: string;
export declare const DIR_ROOT: string;
export declare const DIR_SRC: string;
export declare const DOCS_URL = "https://ajiu9.cn/comuse";
export declare const git: import("simple-git").SimpleGit;
export declare function listFunctions(dir: string, ignore?: string[]): Promise<string[]>;
export declare function readMetadata(): Promise<PackageIndexes>;
export declare function uniq<T extends any[]>(a: T): any[];
