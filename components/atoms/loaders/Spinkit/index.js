import React from "react";
import LoaderWrapper from "../LoaderWrapper";
import Bounce from "./Bounce";
import Chase from "./Chase";
import DoubleBounce from "./DoubleBounce";
import styles from "./spinkit.module.css";

function getLoader(name, props) {
  switch (name) {
    case "bounce":
      return <Bounce {...props} />
    case "chase":
      return <Chase {...props} />
    case "double-bounce":
      return <DoubleBounce {...props} />
    default:
      return null;
  }
}

export default function Spinkit({ name, ...props }) {
  return (
    <LoaderWrapper className={styles.root}>
      {getLoader(name, props)}
    </LoaderWrapper>
  );
}
