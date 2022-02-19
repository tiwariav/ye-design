import anime from "animejs/lib/anime.es.js";
import clsx from "clsx";
import { isNumber, uniqueId } from "lodash-es";
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
  const animeId = useMemo(() => uniqueId(), []);
  const angles = useMemo(() => {
    const value = [];
    const parts = isNumber(segments)
      ? [...Array.from({ length: segments })].fill(100 / segments)
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
      targets: `#anime_indicator__${animeId}`,
      rotateZ: [0, (180 * percentage) / 100],
      ...animeProps,
    });
    anime({
      targets: `#anime_text__${animeId}`,
      textContent: [0, percentage],
      round: 1,
      ...animeProps,
      easing: "easeOutElastic(1, 2)",
    });
  }, [percentage, animeId]);

  return (
    <div className={clsx(styles.root, className)} {...props}>
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
        id={`anime_indicator__${animeId}`}
        className={clsx(styles.indicator)}
      >
        <BsCaretLeftFill />
      </div>
      <div className={styles.content}>
        <div id={`anime_text__${animeId}`} className={clsx(styles.text)}>
          {text ? text : percentage}
        </div>
        {children}
      </div>
    </div>
  );
}
