import { IconCircleChevronRight } from "@tabler/icons-react";
import React from "react";
import styles from "./bookmark.module.css";

function Bookmark({ children, ...props }) {
  return (
    <div className={styles.bookmark} {...props}>
      {React.Children.map(children, (child, index) => (
        <span className={styles.item}>
          <span className={styles.text}>{child}</span>
          {index < React.Children.count(children) - 1 ? (
            <span className={styles.separator}>
              <IconCircleChevronRight />
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export default Bookmark;
