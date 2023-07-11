/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  is-list, is-grid
]}] */

import { IconFilter, IconSortDescending } from "@tabler/icons-react";
import React, { CSSProperties, ReactNode } from "react";

import Container from "../../atoms/Container/Container.js";
import { Button } from "../../atoms/index.js";
import styles from "./collection.module.css";

type FilterOption = {
  key: string;
  name: string;
  options: string[];
};

type SortOption = {
  key: string;
  name: string;
};

const COLLECTION_VARIANT_OPTIONS = ["list", "grid"];

interface CollectionProps {
  children: ReactNode;
  columns?: number;
  filter?: FilterOption[];
  sort?: SortOption[];
  title?: string;
  variant?: (typeof COLLECTION_VARIANT_OPTIONS)[number];
}

export default function Collection({
  children,
  columns,
  filter,
  sort,
  title,
  variant = "list",
  ...props
}: CollectionProps) {
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
