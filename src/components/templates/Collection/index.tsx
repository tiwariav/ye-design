/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-list, is-grid
]}] */

import { IconFilter, IconSortDescending } from "@tabler/icons-react";
import React, { CSSProperties } from "react";

import Container from "../../atoms/Container/Container.js";
import { Button } from "../../atoms/index.js";
import styles from "./collection.module.css";

function Collection({
  bookmarkItems,
  children,
  columns,
  filter,
  sort,
  title,
  variant = "list",
  ...props
}: any) {
  const itemStyle: CSSProperties = {};
  const contentStyle: CSSProperties = {};
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
      {((filter && filter.length > 0) || (sort && sort.length > 0)) && (
        <div className={styles.options}>
          {filter && (
            <Button
              className={styles.button}
              iconBefore={<IconFilter />}
              label="Filter"
              size="small"
            />
          )}
          {sort && (
            <Button
              className={styles.button}
              iconBefore={<IconSortDescending />}
              label="Sort"
              size="small"
            />
          )}
        </div>
      )}
      <div className={styles[`is-${variant}`]} style={contentStyle}>
        {React.Children.map(children, (child, index) => (
          <div className={styles.item} key={index} style={itemStyle}>
            {child}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Collection;
