// not used

module.exports = {
  plugins: ["@babel/plugin-proposal-class-properties"],
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
};
