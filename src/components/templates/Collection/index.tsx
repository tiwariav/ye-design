import { clsx } from "clsx";
import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import Container from "../../atoms/Container/Container.js";
import { Button } from "../../atoms/index.js";
import styles from "./collection.module.css";

function Collection({
  bookmarkItems,
  title,
  filter,
  sort,
  variant = "list",
  columns,
  children,
  ...props
}: any) {
  const itemStyle = {} as any;
  const contentStyle = {} as any;
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
      {(filter && filter.length > 0) || (sort && sort.length > 0) ? (
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

export default Collection;
