import styles from "./formGroup.module.css";

export default function FormGroup({ label, error, children, ...props }) {
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
      {error ? <div className={styles.error}>{error.message}</div> : null}
    </div>
  );
}
