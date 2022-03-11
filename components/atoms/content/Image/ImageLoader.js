import ContentLoader from "react-content-loader";

const TEST_UNIQUE_KEY = process.env.JEST_WORKER_ID ? "test" : undefined;

export default function ImageLoader(props) {
  return (
    <ContentLoader
      viewBox="0 0 10 10"
      preserveAspectRatio="xMidYMid slice"
      uniqueKey={TEST_UNIQUE_KEY}
      {...props}
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" width="10" height="10" />
    </ContentLoader>
  );
}
