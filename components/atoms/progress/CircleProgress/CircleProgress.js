import clsx from "clsx";
import React from "react";
import styles from "./circleProgress.module.css";

export default function CircleProgress({
  className,
  progress,
  isSemi,
  squareSize = 20,
  text,
  strokeWidth = 2,
  color,
  isLarge,
  children,
  ...props
}) {
  // calculate percentage
  const percentage = 100 * (progress[0] / progress[1]);
  let fill = color;
  if (!fill) {
    if (percentage === 0) {
      fill = "#C23934";
    } else if (percentage > 0 && percentage < 100) {
      fill = "#FF9F00";
    } else if (percentage === 100) {
      fill = "#04844B";
    }
  }

  // Size of the enclosing square
  const dia = isSemi ? squareSize * 2 : squareSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (squareSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${squareSize} ${isSemi ? squareSize / 2 : squareSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset =
    dashArray - (dashArray * (isSemi ? percentage / 2 : percentage)) / 100;
  const textType = text ? text.split(" ")[0] : undefined;

  return (
    <div
      className={clsx(styles.root, {
        "is-semi": isSemi,
        "is-large": isLarge,
      })}
      data-tooltip={`${progress[0]} of ${progress[1]} uploaded.`}
      style={{
        height: squareSize,
        width: squareSize,
      }}
    >
      <svg width={dia} height={isSemi ? dia * 2 : dia} viewBox={viewBox}>
        <circle
          className={styles.circleBackground}
          cx={squareSize / 2}
          cy={squareSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={styles.circleProgress}
          cx={squareSize / 2}
          cy={squareSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(${isSemi ? "180" : "-90"} ${squareSize / 2} ${
            squareSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          stroke={fill}
        />
        {textType ? (
          <text
            className={styles.text}
            fill={fill}
            x="50%"
            y={isSemi ? "100%" : "50%"}
            dy={isSemi ? "-.25em" : ".375em"}
            textAnchor="middle"
          >
            {textType === "parts"
              ? `${progress[0]}/${progress[1]}`
              : textType === "percent"
              ? `${percentage}`
              : textType === "append"
              ? `${progress[0]} ${text.split(" ")[1]}`
              : null}
          </text>
        ) : null}
      </svg>
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
