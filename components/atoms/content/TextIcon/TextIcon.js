import styles from "./textIcon.module.css";

function Text({ children, ...props }) {
  return (
    <span className={styles.container} {...props}>
      {children}
    </span>
  );
}

export default Text;
