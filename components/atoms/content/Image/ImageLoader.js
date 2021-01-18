import React from "react";
import ContentLoader from "react-content-loader";

export default function ImageLoader(props) {
  return (
    <ContentLoader
      viewBox="0 0 10 10"
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" width="10" height="10" />
    </ContentLoader>
  );
}
