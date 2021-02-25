import { resolve } from "path";
const root = resolve(__dirname, "../../../");
const rootConfig = require(`${root}/jest.config.js`);

export default {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: "integration-tests",
    testMatch: ["<rootDir>/src/test/integration/**/*.spec.ts"],
  },
};
