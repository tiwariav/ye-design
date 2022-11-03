import { ThemeContext } from "wo-library/contexts.js";
import defaultThemeStyleOptions from "../styles/themes/index.js";

export const withThemeProvider = (Story, context) => {
  return (
    <ThemeContext.ThemeProvider
      themeVariants={defaultThemeStyleOptions}
      // @ts-ignore
      activeThemeName={context.globals.theme}
    >
      <Story {...context} />
    </ThemeContext.ThemeProvider>
  );
};
