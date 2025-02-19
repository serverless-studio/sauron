// jest.config.ts (Recommended for TypeScript projects)
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.paths.json';

const config: Config.InitialOptions = {
  // preset: 'ts-jest', // Use ts-jest to process TypeScript files
  testMatch: [
    '**/__tests__/**/*.ts?(x)', // Look for tests in __tests__ directories
    '**/?(*.)+(spec|test).ts?(x)' // Look for tests with .spec.ts or .test.ts extensions
  ],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
  // },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: process.cwd() }),
};

export default config;
