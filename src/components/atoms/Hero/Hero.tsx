import { clsx } from "clsx";

import styles from "./hero.module.css";

function Hero({ children, midContent, title }: any) {
  return (
    <div className={clsx(styles.hero)}>
      <div className={clsx(styles.content)}>
        {title && <h1 className={clsx(styles.title)}>{title}</h1>}
        {midContent && <div className={styles.contentMid}>{midContent}</div>}
        {children}
      </div>
    </div>
  );
}

Hero.propTypes = {};

export default Hero;
