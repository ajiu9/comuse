import type { CommitInfo } from 'comuse-metadata';
export declare function uniq<T extends any[]>(a: T): any[];
export declare function getChangeLog(count?: number): Promise<CommitInfo[]>;
