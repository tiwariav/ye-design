import { MultipleFieldErrors } from "react-hook-form";

import styles from "./hookFormWrapper.module.css";

const CustomError = ({
  messages,
}: {
  messages: MultipleFieldErrors | string;
}) => {
  return (
    <div className={styles.errors}>
      {Object.entries(messages).map(([type, message]) => (
        <p className={styles.errorItem} key={type}>
          {message}
        </p>
      ))}
    </div>
  );
};

export default CustomError;
