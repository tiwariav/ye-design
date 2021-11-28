import clsx from "clsx";
import React from "react";
import defaultThemeStyleOptions from "../../themes";
import "../../themes/base.css";

export default function ThemeProvider({ children, theme, themeStyleOptions }) {
  const styles = themeStyleOptions
    ? themeStyleOptions[theme]
    : defaultThemeStyleOptions[theme];
  return <div className={clsx({ [styles.root]: theme })}>{children}</div>;
}
