import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import { Button } from "../../atoms/forms/Button";
import Container from "../../atoms/sections/Container/Container";
import styles from "./collection.module.css";

function Collection({
  bookmarkItems,
  title,
  filter,
  sort,
  variant,
  columns,
  children,
  ...props
}) {
  const itemStyle = {};
  const contentStyle = {};
  if (columns) {
    if (variant === "list") {
      itemStyle.width = `${100 / columns}%`;
    } else if (variant === "grid") {
      contentStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
  }
  return (
    <Container {...props}>
      <h1 className={styles.title}>{title}</h1>
      {(filter && filter.length) || (sort && sort.length) ? (
        <div className={styles.options}>
          {filter ? (
            <Button
              className={styles.button}
              size="small"
              label="Filter"
              iconBefore={<AiOutlineFilter />}
            />
          ) : null}
          {sort ? (
            <Button
              className={styles.button}
              size="small"
              label="Sort"
              iconBefore={<BiSortDown />}
            />
          ) : null}
        </div>
      ) : null}
      <div
        className={clsx(styles.content, styles[`is-${variant}`])}
        style={contentStyle}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={styles.item} style={itemStyle}>
            {child}
          </div>
        ))}
      </div>
    </Container>
  );
}

Collection.propTypes = {
  /**
   * Layout variant
   */
  variant: PropTypes.oneOf(["grid", "list"]),
  /**
   * No.of fixed columns
   */
  columns: PropTypes.number,
};

Collection.defaultProps = {
  variant: "list",
};

export default Collection;
