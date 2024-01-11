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
    "plugin/stylelint-no-indistinguishable-colors": [
      true,
      {
        ignore: ["#f4f5f6", "#f5f5f5", "#f6f7f8", "#f9fafb"],
      },
    ],
  },
};
