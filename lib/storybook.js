import { ThemeContext } from "wo-library/contexts";
import defaultThemeStyleOptions from "../styles/themes";

export const withThemeProvider = (Story, context) => {
  return (
    <ThemeContext.ThemeProvider
      themeVariants={defaultThemeStyleOptions}
      activeThemeName={context.globals.theme}
    >
      <Story {...context} />
    </ThemeContext.ThemeProvider>
  );
};
