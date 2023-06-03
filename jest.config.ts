import { Config } from "jest";
// @ts-ignore: TS2835 because jest.config.ts is not read as module by jest
import { config as sharedConfig } from "wo-library/tools/cjs/jest/config.cjs";

const config: Config = {
  ...(sharedConfig as Config),
  setupFilesAfterEnv: ["wo-library/tools/cjs/jest/setupTests.cjs"],
  testRegex: "src.*(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|default-import)/)"],
};

export default config;
