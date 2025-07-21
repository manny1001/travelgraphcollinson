module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/dist/'],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/server.ts', // Exclude server setup
      '!src/presentation/graphql/schema.ts' // Exclude schema as it’s not logic-heavy
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov']
  };