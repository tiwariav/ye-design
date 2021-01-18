import clsx from "clsx";
import React from "react";
import Container from "../../atoms/sections/Container/Container";
import styles from "./details.module.css";

function Details({
  headerMain,
  headerSide,
  contentSide,
  children,
  className,
  hasSeparator,
  ...props
}) {
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
            <div key={index} className={styles.item} style={itemStyle}>
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
