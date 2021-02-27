const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
	rootDir: root,
	testEnvironment: 'node',
	clearMocks: true,
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
};
