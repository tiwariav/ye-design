import clsx from "clsx";
import React from "react";
import "../../themes/base.css";
import styles from "./themeProvider.module.css";

export default function ThemeProvider({ children, theme }) {
  return <div className={clsx(styles.theme, theme)}>{children}</div>;
}
