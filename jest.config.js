/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};