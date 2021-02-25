import { resolve } from "path";
const root = resolve(__dirname, "../../../");
const rootConfig = require(`${root}/jest.config.js`);

export default {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: "unit-tests",
    testMatch: ["<rootDir>/src/test/unit/**/*.spec.ts"],
  },
};
