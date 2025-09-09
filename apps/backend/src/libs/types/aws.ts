import type { AWS } from 'osls';

export type AWSFunction = NonNullable<AWS['functions']>[string] & { warmup?: unknown };
