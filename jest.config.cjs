module.exports = {
 testEnvironment: "jsdom",
 setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }], "\\.(png|jpg)$": "<rootDir>/tests/mocks/fileMock.cjs" },
 moduleNameMapper: { "\\.css$": "<rootDir>/tests/mocks/styleMock.cjs" }
};
