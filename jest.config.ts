export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
}