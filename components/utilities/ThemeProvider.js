import clsx from "clsx";
import React from "react";
import themes from "../../themes";
import "../../themes/default.css";

export default function ThemeProvider({ children, theme }) {
  const styles = themes[theme] || {};

  return <div className={clsx(styles.theme)}>{children}</div>;
}
