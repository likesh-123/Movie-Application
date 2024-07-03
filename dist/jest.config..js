"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/test/MovieRoutesTest.ts"],
    //   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    //   setupFiles: ["dotenv/config"],
    //   globals: {
    //     "ts-jest": {
    //       tsconfig: "tsconfig.json",
    //     },
    //   },
};
exports.default = config;
