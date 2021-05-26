import anime from "animejs/lib/anime.es.js";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { BsCaretLeftFill } from "react-icons/bs";
import { describeArc } from "../../../../lib/svg";
import styles from "./arcProgress.module.css";

export default function ArcProgress({
  className,
  progress,
  text,
  strokeWidth = 2,
  colors = ["#eb5757", "#f2c94c", "#2f80ed", "#6fcf97"],
  segments = 4,
  children,
  ...props
}) {
  // calculate percentage
  const percentage = useMemo(
    () => 100 * (progress[0] / progress[1]),
    [progress]
  );
  const angles = useMemo(() => {
    const value = [];
    let parts =
      typeof segments === "number"
        ? [...Array(segments)].fill(100 / segments)
        : segments;
    let startAngle = -90;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      const nextAngle = startAngle + (180 * part) / 100;
      const endAngle = index !== parts.length - 1 ? nextAngle - 7.5 : nextAngle;
      value.push([startAngle, endAngle]);
      startAngle = nextAngle;
    }
    return value;
  }, [segments]);

  useEffect(() => {
    const animeProps = {
      delay: 1000,
      duration: 3000,
    };
    anime({
      targets: ".anime-indicator",
      rotateZ: [0, (180 * percentage) / 100],
      ...animeProps,
    });
    anime({
      targets: ".anime-text",
      textContent: [0, percentage],
      round: 1,
      ...animeProps,
      easing: "easeOutElastic(1, 2)",
    });
  }, [percentage]);

  return (
    <div className={clsx(styles.root, className)} {...props}>
      <svg className={styles.svg} viewBox="0 0 100 50">
        {angles.map(([startAngle, endAngle], index) => (
          <path
            fill="none"
            stroke={colors[index] || "#000"}
            strokeWidth={strokeWidth}
            d={describeArc(
              50,
              50 - strokeWidth,
              50 - strokeWidth * 2,
              startAngle,
              endAngle
            )}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className={clsx(styles.indicator, "anime-indicator")}>
        <BsCaretLeftFill />
      </div>
      <div className={styles.content}>
        <div className={clsx(styles.text, "anime-text")}>
          {text ? text : percentage}
        </div>
        {children}
      </div>
    </div>
  );
}
