import clsx from "clsx";
import React from "react";
import "../../themes/base.css";

export default function ThemeProvider({ children, theme }) {
  return <div className={clsx({ theme: theme })}>{children}</div>;
}
