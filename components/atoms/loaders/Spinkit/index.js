import React from "react";
import LoaderWrapper from "../LoaderWrapper";
import Bounce from "./Bounce";
import Chase from "./Chase";
import DoubleBounce from "./DoubleBounce";
import styles from "./spinkit.module.css";

export default function Spinkit({ name, ...props }) {
  return (
    <LoaderWrapper className={styles.root}>
      {name === "bounce" ? (
        <Bounce {...props} />
      ) : name === "chase" ? (
        <Chase {...props} />
      ) : name === "double-bounce" ? (
        <DoubleBounce {...props} />
      ) : null}
    </LoaderWrapper>
  );
}
