import generateCssWrapper from "./generateCssWrapper.js";
import styles from "./span.module.css";

export const IconSpan = generateCssWrapper(styles.icon, "span");
export const FormIconSpan = generateCssWrapper(styles.formIcon, "span");
