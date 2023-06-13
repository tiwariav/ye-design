import { clsx } from "clsx";
import React from "react";

import Container from "../../atoms/Container/Container.js";
import styles from "./details.module.css";

function Details({
  children,
  className,
  contentSide,
  hasSeparator,
  headerMain,
  headerSide,
  ...props
}: any) {
  const itemStyle = {};
  return (
    <Container
      className={clsx(className, { [styles.hasSeparator]: hasSeparator })}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.content}>{headerMain}</div>
        <div className={styles.aside}>{headerSide}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {React.Children.map(children, (child, index) => (
            <div className={styles.item} key={index} style={itemStyle}>
              {child}
            </div>
          ))}
        </div>
        <div className={styles.aside}>{contentSide}</div>
      </div>
    </Container>
  );
}

Details.propTypes = {};

export default Details;
