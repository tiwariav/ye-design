/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  segment-1, segment-2, segment-3, segment-4
]}] */
import { IconArrowLeftRhombus } from "@tabler/icons-react";
import { clsx } from "clsx";
import { ReactNode, useId, useMemo } from "react";

import { describeArc } from "../../../tools/svg.js";
import styles from "./arcProgress.module.css";
import useProgressAnimation from "./useProgressAnimations.js";

interface ArcProgressProps {
  children: ReactNode;
  className?: string;
  innerClassNames?: {
    [key: `segment${number}`]: string;
    segment?: string;
  };
  progress: [number, number];
  segments?: number;
  strokeWidth?: number;
}

export default function ArcProgress({
  children,
  className,
  innerClassNames,
  progress,
  segments = 4,
  strokeWidth = 2,
}: ArcProgressProps) {
  // calculate percentage
  const percentage = 100 * (progress[0] / progress[1]);
  const animeId = useId();
  const angles = useMemo(() => {
    const value: [number, number][] = [];
    const parts = Array.from<number>({ length: segments }).fill(100 / segments);
    let startAngle = -90;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      const nextAngle = startAngle + (180 * part) / 100;
      const endAngle = index === parts.length - 1 ? nextAngle : nextAngle - 7.5;
      value.push([startAngle, endAngle]);
      startAngle = nextAngle;
    }
    return value;
  }, [segments]);

  /*#__PURE__*/ useProgressAnimation(percentage, animeId);

  return (
    <div className={clsx(styles.root, className)}>
      <svg className={styles.svg} viewBox="0 0 100 50">
        {angles.map(([startAngle, endAngle], index) => (
          <path
            className={clsx(
              styles.segment,
              // @ts-expect-error: TS7053 because of dynamic key
              styles[`segment${index + 1}`],
              innerClassNames?.segment,
              innerClassNames?.[`segment${index + 1}`],
            )}
            d={describeArc(
              50,
              50 - strokeWidth,
              50 - strokeWidth * 2,
              startAngle,
              endAngle,
            )}
            fill="none"
            key={index}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
      <div className={clsx(styles.indicator)} id={`${animeId}-animeIndicator`}>
        <IconArrowLeftRhombus />
      </div>
      <div className={styles.content}>
        <div className={clsx(styles.text)} id={`${animeId}-animeText`}>
          {percentage}
        </div>
        {children}
      </div>
    </div>
  );
}
