import React from "react";
import "../../themes/default.css";
import themes from "../../themes";

export default function ThemeProvider({ children, theme }) {
  const styles = themes[theme] || {};

  return <div className={styles.theme}>{children}</div>;
}
