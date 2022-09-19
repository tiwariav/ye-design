import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import styles from "./bookmark.module.css";

function Bookmark({ children, ...props }) {
  return (
    <div className={styles.bookmark} {...props}>
      {React.Children.map(children, (child, index) => (
        <span className={styles.item}>
          <span className={styles.text}>{child}</span>
          {index < React.Children.count(children) - 1 ? (
            <span className={styles.separator}>
              <AiOutlineRight />
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export default Bookmark;
