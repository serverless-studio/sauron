/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  // [...]
  // setupFiles: ['<rootDir>/testing/globalSetup.js'],
  coverageDirectory: '<rootDir>/testing/coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: process.cwd() }),
};
