module.exports = {
  extends: "@tiwariav/stylelint-config",
  rules: {
    "csstools/value-no-unknown-custom-properties": [
      true,
      {
        importFrom: ["src/styles/base.css"],
      },
    ],
    "csstools/media-use-custom-media": [
      "always-known",
      {
        importFrom: ["src/styles/media.css"],
      },
    ],
  },
};
