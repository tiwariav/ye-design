import { clsx } from "clsx";
import React from "react";
import Container from "../../atoms/Container/Container.js";
import styles from "./profile.module.css";

function Profile({
  coverImage,
  contentLeft,
  children,
  className,
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
            <div key={index} className={styles.item} style={itemStyle}>
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
