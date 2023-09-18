/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: [
  progress-none, progress-partial, progress-full
]}] */

import { clsx } from "clsx";
import { ReactNode, useMemo } from "react";

import styles from "./circleProgress.module.css";

export function getProgressClass(percentage: number) {
  if (percentage <= 0) {
    return "progressNone";
  } else if (percentage < 100) {
    return "progressPartial";
  }
  return "progressFull";
}

function getCircleStyles(radius: number, arcRotation = 0, completion = 0) {
  // Arc length at 100% coverage is the circle circumference
  const strokeDasharray = radius * Math.PI * 2;
  const rotationOffset = (2 * radius * (arcRotation - 90) * Math.PI) / 180;
  // Scale 100% coverage overlay with the actual percent
  const strokeDashoffset =
    rotationOffset +
    ((strokeDasharray - rotationOffset) * (100 - completion)) / 100;
  return { strokeDasharray, strokeDashoffset };
}

const CIRCLE_PROGRESS_TEXT_OPTIONS = ["parts", "percent", "value"];
type TextContentOptions =
  | (typeof CIRCLE_PROGRESS_TEXT_OPTIONS)[number]
  | string;

function getTextContent(
  text: TextContentOptions,
  progress: [number, number],
  percentage: number,
) {
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

interface CenterTextProps {
  arcHeight: number;
  className?: string;
  fill?: string;
  percentage: number;
  progress: [number, number];
  text?: TextContentOptions;
}

function CenterText({
  arcHeight,
  className,
  fill,
  percentage,
  progress,
  text,
}: CenterTextProps) {
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
  className?: string;
  innerClassNames?: {
    circleBackground?: string;
    progressFull?: string;
    progressNone?: string;
    progressPartial?: string;
    text?: string;
  };
  progress: [number, number];
  progressText?: "parts" | "percent" | "value" | string;
  squareSize?: number;
  strokeWidth?: number;
}

export default function CircleProgress({
  arcHeight = 100,
  children,
  className,
  innerClassNames = {},
  progress,
  progressText,
  squareSize = 20,
  strokeWidth = 2,
  ...props
}: CircleProgressProps) {
  const initData = useMemo(() => {
    // Size of the enclosing square
    const height = (squareSize * arcHeight) / 100;
    const dia = (squareSize * 100) / arcHeight;
    const squareHeight = (dia * arcHeight) / 100;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (squareSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${squareSize} ${height}`;
    const calcRadius = radius;
    const arcRotation =
      90 +
      Math.acos((height - strokeWidth - calcRadius) / calcRadius) *
        (180 / Math.PI);
    return { arcRotation, dia, height, radius, squareHeight, viewBox };
  }, [arcHeight, squareSize, strokeWidth]);

  const progressData: {
    circleStyles: {
      strokeDasharray: number;
      strokeDashoffset: number;
    };
    completion: number;
    progressClass: ReturnType<typeof getProgressClass>;
  } = useMemo(() => {
    const completion =
      progress[0] && progress[1] ? (100 * progress[0]) / progress[1] : 0;
    const progressClass = getProgressClass(completion);
    const { arcRotation, radius } = initData;
    const circleStyles = getCircleStyles(radius, arcRotation, completion);
    return { circleStyles, completion, progressClass: progressClass };
  }, [initData, progress]);

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
          className={clsx(
            styles.circleBackground,
            innerClassNames.circleBackground,
          )}
          cx={squareSize / 2}
          cy={squareSize / 2}
          r={initData.radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={clsx(
            styles.circleProgress,
            {
              [styles.strokeRound]: arcHeight === 100,
            },
            styles[progressData.progressClass],
            innerClassNames[progressData.progressClass],
          )}
          cx={squareSize / 2}
          cy={squareSize / 2}
          markerEnd="url(#round)"
          r={initData.radius}
          strokeWidth={`${strokeWidth}px`}
          style={progressData.circleStyles}
          transform={`rotate(${initData.arcRotation} ${squareSize / 2} ${
            squareSize / 2
          })`}
        />
        <CenterText
          arcHeight={arcHeight}
          className={clsx(
            innerClassNames.text,
            styles[progressData.progressClass],
            innerClassNames[progressData.progressClass],
          )}
          percentage={progressData.completion}
          progress={progress}
          text={progressText}
        />
      </svg>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
