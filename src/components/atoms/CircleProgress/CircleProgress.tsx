import { clsx } from "clsx";
import { ReactNode, useMemo } from "react";

import styles from "./circleProgress.module.css";

function getFillColor(percentage) {
  if (percentage <= 0) {
    return "#C23934";
  } else if (percentage < 100) {
    return "#FF9F00";
  }
  return "#04844B";
}

function getCircleStyles(
  radius: number,
  arcRotation = 0,
  completion = 0
) {
  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2;
  const rotationOffset = (2 * radius * (arcRotation - 90) * Math.PI) / 180;
  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset =
    rotationOffset +
    ((strokeDasharray - rotationOffset) * (100 - completion)) / 100;
  return { strokeDasharray, strokeDashoffset };
}

function getTextContent(text, progress, percentage) {
  switch (text) {
    case "parts": {
      return progress[0] / progress[1];
    }
    case "percent": {
      return `${percentage}%`;
    }
    case "value": {
      return progress[0];
    }
    default: {
      return `${progress[0]} ${text}`;
    }
  }
}

function CenterText({
  arcHeight,
  className,
  fill,
  percentage,
  progress,
  text,
}) {
  return (
    text && (
      <text
        className={clsx([styles.text], className)}
        dominantBaseline="middle"
        fill={fill}
        textAnchor="middle"
        x="50%"
        y={`${50 + (100 - arcHeight) / 2}%`}
      >
        {getTextContent(text, progress, percentage)}
      </text>
    )
  );
}

interface CircleProgressProps {
  arcHeight?: number;
  children?: ReactNode;
  circleBackground?: string;
  className?: string;
  color?: string;
  innerClassNames?: {
    text?: string;
  };
  progress: [number, number];
  progressText?: "parts" | "progress" | string;
  squareSize?: number;
  strokeWidth?: number;
}

export default function CircleProgress({
  arcHeight = 100,
  children,
  circleBackground,
  className,
  color,
  innerClassNames = {},
  progress,
  progressText,
  squareSize = 20,
  strokeWidth = 2,
  ...props
}: CircleProgressProps) {
  const initData = useMemo(() => {
    // Size of the enclosing square
    const dia = (squareSize * 100) / arcHeight;
    const squareHeight = (dia * arcHeight) / 100;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (squareSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${squareSize} ${(squareSize * arcHeight) / 100}`;
    const calcRadius = radius;
    const arcRotation =
      90 + Math.acos((arcHeight - calcRadius) / calcRadius) * (180 / Math.PI);
    return { arcRotation, dia, radius, squareHeight, viewBox };
  }, [arcHeight, squareSize, strokeWidth]);

  const progressData = useMemo(() => {
    const completion =
      progress[0] && progress[1] ? (100 * progress[0]) / progress[1] : 0;
    const fill = color || getFillColor(completion);
    const { arcRotation, radius } = initData;
    const circleStyles = getCircleStyles(radius, arcRotation, completion);
    return { circleStyles, completion, fill };
  }, [color, initData, progress]);

  return (
    <div
      className={clsx(styles.root, className)}
      data-tooltip={`${progress[0]} / ${progress[1]}`}
      {...props}
    >
      <svg
        height={(squareSize * arcHeight) / 100}
        viewBox={initData.viewBox}
        width={squareSize}
      >
        <circle
          className={styles.circleBackground}
          cx={squareSize / 2}
          cy={squareSize / 2}
          r={initData.radius}
          strokeWidth={`${strokeWidth}px`}
          style={{ stroke: circleBackground }}
        />
        <circle
          className={clsx(styles.circleProgress, {
            [styles.strokeRound]: arcHeight === 100,
          })}
          transform={`rotate(${initData.arcRotation} ${squareSize / 2} ${
            squareSize / 2
          })`}
          cx={squareSize / 2}
          cy={squareSize / 2}
          markerEnd="url(#round)"
          r={initData.radius}
          stroke={progressData.fill}
          strokeWidth={`${strokeWidth}px`}
          style={progressData.circleStyles}
        />
        <CenterText
          arcHeight={arcHeight}
          className={innerClassNames.text}
          fill={progressData.fill}
          percentage={progressData.completion}
          progress={progress}
          text={progressText}
        />
      </svg>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
