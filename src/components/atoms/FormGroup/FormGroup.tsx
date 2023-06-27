import styles from "./formGroup.module.css";

export default function FormGroup({ children, error, label, ...props }: any) {
  return (
    <div className={styles.container} {...props}>
      {label ? (
        <label>
          <span className={styles.labelText}>{label}</span>
          {children}
        </label>
      ) : (
        children
      )}
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}
