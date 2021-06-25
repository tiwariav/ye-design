import React from "react";
import styles from "./loaderWrapper.module.css";

export default function LoaderWrapper(props) {
  return <div className={styles.root} {...props} />;
}
