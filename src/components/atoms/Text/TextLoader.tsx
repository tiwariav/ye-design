import ContentLoader from "../../../vendors/ContentLoader.js";

const TEST_UNIQUE_KEY = process.env.JEST_WORKER_ID ? "test" : undefined;

export default function TextLoader({ lines = 1, ...props }: any) {
  const height = 24 * (lines || 1);

  return (
    <ContentLoader
      preserveAspectRatio="none"
      uniqueKey={TEST_UNIQUE_KEY}
      viewBox={`0 0 100 ${height}`}
      {...props}
    >
      {/* Only SVG shapes */}
      {/* eslint-disable-next-line prefer-spread */}
      {Array.apply(null, { length: lines || 1 }).map((item, index) => (
        <rect
          height="20"
          key={index}
          width={index ? 100 - Math.pow(8, 3 - (lines - index)) : 100}
          x="0"
          y={index * 24 + 3}
        />
      ))}
    </ContentLoader>
  );
}
