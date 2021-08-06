import clsx from "clsx";
import React from "react";
import styles from "./dropdownMenu.module.css";

export default function DropdownMenu({
  children,
  menuRight,
  parentMenuNode,
  ...props
}) {
  return (
    <ul
      className={clsx(styles.list, { [styles.listRight]: menuRight })}
      {...props}
    >
      {React.Children.toArray(children).map((item, index) => {
        const extraProps =
          item.type.name === "Dropdown" ? { parentMenuNode } : {};
        return (
          <li key={index}>
            {React.cloneElement(item, {
              className: clsx(item.props.className, {
                [styles.itemRight]: menuRight,
              }),
              ...extraProps,
            })}
          </li>
        );
      })}
    </ul>
  );
}
