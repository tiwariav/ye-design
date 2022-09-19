import { withTests } from "@storybook/addon-jest";
import { addDecorator } from "@storybook/react";
import { globalTypes, parameters } from "wo-library/tools/storybook";
import "../styles/base.css";
import defaultThemeStyleOptions from "../styles/themes";
import { withThemeProvider } from "../tools/storybook";

globalTypes.theme.toolbar.items.push(...Object.keys(defaultThemeStyleOptions));
export { parameters, globalTypes };

export const decorators = [withThemeProvider];

let results;

try {
  results = "../reports/test-report.json";
} catch {
  console.log("reports/test-report.json does not exist, skipping.");
}

if (results) addDecorator(withTests({ results }));
