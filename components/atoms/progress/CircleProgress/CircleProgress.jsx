import clsx from "clsx";
import { useMemo } from "react";
import styles from "./circleProgress.module.css";

function getFillColor(percentage) {
  if (percentage === 0) {
    return "#C23934";
  } else if (percentage > 0 && percentage < 100) {
    return "#FF9F00";
  }
  return "#04844B";
}

function getCircleStyles(radius, percentage, isSemi) {
  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset =
    strokeDasharray -
    (strokeDasharray * (isSemi ? percentage / 2 : percentage)) / 100;
  return { strokeDasharray, strokeDashoffset };
}

function getTextTypeContent(textType, text, progress, percentage) {
  switch (textType) {
    case "parts":
      return progress[0] / progress[1];
    case "percent":
      return percentage;
    case "append":
      return `${progress[0]} ${text.split(" ")[1]}`;
    default:
      return null;
  }
}

function CenterText({
  fill,
  isSemi,
  percentage,
  progress,
  text,
  centerTextClassName,
}) {
  const textType = useMemo(
    () => (text ? text.split(" ")[0] : undefined),
    [text]
  );
  return textType ? (
    <text
      className={clsx([styles.text], centerTextClassName)}
      fill={fill}
      x="50%"
      y={isSemi ? "100%" : "50%"}
      dy={isSemi ? "-.25em" : ".375em"}
      textAnchor="middle"
    >
      {getTextTypeContent(textType, text, progress, percentage)}
    </text>
  ) : null;
}

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
  circleBackground,
  centerTextClassName,
  ...props
}) {
  const percentage = useMemo(
    () => (100 * progress[0]) / progress[1],
    [progress]
  );
  const fill = color || getFillColor(percentage);
  // Size of the enclosing square
  const dia = isSemi ? squareSize * 2 : squareSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (squareSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${squareSize} ${isSemi ? squareSize / 2 : squareSize}`;
  const rootStyles = { height: squareSize, width: squareSize };
  const circleStyles = getCircleStyles(radius, percentage, isSemi);

  return (
    <div
      className={clsx(styles.root, className, {
        [styles["is-semi"]]: isSemi,
        [styles["is-large"]]: isLarge,
      })}
      data-tooltip={`${progress[0]} of ${progress[1]} uploaded.`}
      style={rootStyles}
      {...props}
    >
      <svg width={dia} height={isSemi ? dia * 2 : dia} viewBox={viewBox}>
        <circle
          className={styles.circleBackground}
          style={{ stroke: circleBackground }}
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
          style={circleStyles}
          stroke={fill}
        />
        <CenterText
          fill={fill}
          isSemi={isSemi}
          percentage={percentage}
          progress={progress}
          text={text}
          centerTextClassName={centerTextClassName}
        />
      </svg>
      {children ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
