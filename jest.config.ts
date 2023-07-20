/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: '@shelf/jest-mongodb',
  roots: [
    '<rootDir>/src'
  ],
  testEnvironment: "node",
  transform: {'.+\\.ts$': 'ts-jest'}
};
