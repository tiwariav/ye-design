/* eslint-disable unicorn/prefer-module */
module.exports = {
  plugins: [
    "cssnano",
    "postcss-import",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        features: {
          "custom-media-queries": true,
          "custom-properties": true,
          "gap-properties": true,
          "nesting-rules": true,
        },
        stage: 1,
      },
    ]
  ],
  sourceMap: true,
};
