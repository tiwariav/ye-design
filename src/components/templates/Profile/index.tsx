import { clsx } from "clsx";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

import Container from "../../atoms/Container/Container.js";
import styles from "./profile.module.css";

interface ProfileProps extends ComponentPropsWithoutRef<"div"> {
  contentLeft?: ReactNode;
  coverImage?: ReactNode;
}

export default function Profile({
  children,
  className,
  contentLeft,
  coverImage,
  ...props
}: ProfileProps) {
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
