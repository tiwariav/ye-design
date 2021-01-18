import PropTypes from "prop-types";
import React from "react";
import ContentLoader from "react-content-loader";

export default function TextLoader({ lines, ...props }) {
  const height = 24 * (lines || 1);
  return (
    <ContentLoader
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      {...props}
    >
      {/* Only SVG shapes */}
      {Array.apply(null, { length: lines || 1 }).map((item, index) => (
        <rect
          x="0"
          y={index * 24 + 2}
          width={index ? 100 - Math.pow(8, 3 - (lines - index)) : 100}
          height="20"
        />
      ))}
    </ContentLoader>
  );
}

TextLoader.propTypes = {
  lines: PropTypes.number,
};

TextLoader.defaultProps = {
  lines: 1,
};
