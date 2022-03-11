import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./sideNavGroup.module.css";

export default function SideNavGroup({ title, children, ...props }) {
  return (
    <div className={clsx(styles.root)} {...props}>
      {title ? <div className={clsx(styles.title)}>{title}</div> : null}
      {children}
    </div>
  );
}

SideNavGroup.propTypes = {
  title: PropTypes.string,
};
