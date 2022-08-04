import {
  globalTypes,
  parameters,
  registerResults,
} from "wo-library/lib/storybook";
import { withThemeProvider } from "../lib/storybook";
import "../styles/base.css";
import defaultThemeStyleOptions from "../styles/themes";

globalTypes.theme.toolbar.items.push(...Object.keys(defaultThemeStyleOptions));
export { parameters, globalTypes };

export const decorators = [withThemeProvider];

registerResults("../reports/test-report.json");
