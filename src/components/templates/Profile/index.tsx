import { clsx } from "clsx";
import React from "react";

import Container from "../../atoms/Container/Container.js";
import styles from "./profile.module.css";

function Profile({
  children,
  className,
  contentLeft,
  coverImage,
  ...props
}: any) {
  const itemStyle = {};
  return (
    <Container className={clsx(className)} {...props}>
      <div className={styles.cover}>{coverImage}</div>
      <div className={styles.container}>
        <div className={styles.aside}>{contentLeft}</div>
        <div className={styles.content}>
          {React.Children.map(children, (child, index) => (
            <div className={styles.item} key={index} style={itemStyle}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

Profile.propTypes = {};

export default Profile;
