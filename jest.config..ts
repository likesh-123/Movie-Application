import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
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

export default config;
