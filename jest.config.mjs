import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
