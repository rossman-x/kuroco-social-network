import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/test/tsconfig.test.json",
    },
  },
  moduleNameMapper: {
    "^app/components/(.*)$": "<rootDir>/app/components/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.js",
    "~/(.*)$": "<rootDir>/app/$1",
  },
};
export default config;
