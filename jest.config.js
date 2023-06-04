import { config as sharedConfig } from "wo-library/tools/cjs/jest/config.cjs";

const config = {
  ...sharedConfig,
  setupFilesAfterEnv: ["wo-library/tools/cjs/jest/setupTests.cjs"],
  testRegex: "src.*(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|default-import)/)"],
};

export default config;
