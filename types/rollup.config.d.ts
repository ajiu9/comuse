import type { PackageManifest } from 'comuse-metadata';
import type { RollupOptions } from 'rollup';
export declare function createRollupConfig(pkg: PackageManifest, cwd?: string): RollupOptions[];
