export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  verbose: true,
};
