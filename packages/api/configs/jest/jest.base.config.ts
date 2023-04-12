module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90,
  //   },
  // },
  transform: {
    "\\.[jt]sx?$": ["ts-jest", {
      tsconfig: "<rootDir>/tsconfig.jest.json"
    }],
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  notify: true,
  notifyMode: "failure-change",
  preset: "ts-jest",
  setupFiles: [
    "<rootDir>/configs/jest/utils/setup-test-env.config.ts"
  ],
  setupFilesAfterEnv: [
    "jest-extended/all"
  ],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
};
