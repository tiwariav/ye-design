import {
  IconBallBowling,
  IconDogBowl,
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
} from "@tabler/icons-react";
import { ThemeContext } from "wo-library/contexts/index.js";

import defaultThemeStyleOptions from "../styles/themes/index.js";

export const withThemeProvider = (Story, context) => {
  return (
    <ThemeContext.ThemeProvider
      activeThemeName={context.globals.theme}
      themeVariants={defaultThemeStyleOptions}
    >
      <Story {...context} />
    </ThemeContext.ThemeProvider>
  );
};

export const storyIconMap = {
  IconBallBowling,
  IconDogBowl,
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
  None: null,
};
