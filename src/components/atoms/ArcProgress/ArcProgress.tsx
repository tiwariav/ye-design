import { IconArrowLeftRhombus } from "@tabler/icons-react";
import { clsx } from "clsx";
import { uniqueId } from "lodash-es";
import { ReactNode, useMemo } from "react";

import { describeArc } from "../../../tools/svg.js";
import styles from "./arcProgress.module.css";
import useProgressAnimation from "./useProgressAnimations.js";

interface ArcProgressProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  progress: [number, number];
  segments?: number;
  strokeWidth?: number;
  text?: string;
}

export default function ArcProgress({
  children,
  className,
  colors = ["#eb5757", "#f2c94c", "#2f80ed", "#6fcf97"],
  progress,
  segments = 4,
  strokeWidth = 2,
  text,
}: ArcProgressProps) {
  // calculate percentage
  const percentage = useMemo(
    () => 100 * (progress[0] / progress[1]),
    [progress]
  );
  const animeId = useMemo(() => uniqueId(), []);
  const angles = useMemo(() => {
    const value = [];
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
            d={describeArc(
              50,
              50 - strokeWidth,
              50 - strokeWidth * 2,
              startAngle,
              endAngle
            )}
            fill="none"
            key={index}
            stroke={colors[index] || "#000"}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
      <div
        className={clsx(styles.indicator)}
        id={`anime_indicator__${animeId}`}
      >
        <IconArrowLeftRhombus />
      </div>
      <div className={styles.content}>
        <div className={clsx(styles.text)} id={`anime_text__${animeId}`}>
          {text || percentage}
        </div>
        {children}
      </div>
    </div>
  );
}
