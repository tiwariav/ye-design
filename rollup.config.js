import postcssGlobalData from "@csstools/postcss-global-data";
import replace from "@rollup/plugin-replace";
import _typescript from "@rollup/plugin-typescript";
import { defaultImport } from "default-import";
import _copy from "rollup-plugin-copy";
import _postcss from "rollup-plugin-postcss";
import {
  addCssImportBanner,
  bundleCss,
  cjsOutputOptions,
  commonPlugins,
  devPlugins,
  esOutputOptions,
  getBuildPlugins,
  getCssOutputOptions,
  postcssConfig,
  rollupInputMap,
} from "wo-library/tools/rollup/index.js";

const copy = defaultImport(_copy);
const postcss = defaultImport(_postcss);
const typescript = defaultImport(_typescript);

const isDev = Boolean(process.env.ROLLUP_WATCH);
const STYLES_DIR = "src/styles";

postcssConfig.plugins.splice(
  0,
  0,
  postcssGlobalData({ files: ["./src/styles/media.css"] }),
);

const config = [
  {
    input: rollupInputMap(import.meta.url, "src", {
      excludeDirectories: ["styles"],
    }),
    output: {
      ...esOutputOptions,
      banner: addCssImportBanner,
    },
    perf: isDev,
    plugins: [
      ...commonPlugins,
      copy({ targets: [{ dest: "dist", src: "types" }] }),
      postcss(postcssConfig),
      typescript({ tsconfig: "./tsconfig.rollup.json" }),
      ...getBuildPlugins({ removePostInstall: true }),
      replace({
        patterns: [
          {
            // Use a regular expression to match the postinstall script
            match: /"postinstall": "[^"]*",/,
            // Replace it with an empty string
            replacement: "",
          },
        ],
      }),
      ...devPlugins,
    ],
  },
  {
    input: rollupInputMap(import.meta.url, "src", { extension: "*.cjs" }),
    output: cjsOutputOptions,
    perf: isDev,
    plugins: [...commonPlugins, ...devPlugins],
  },
  {
    input: rollupInputMap(import.meta.url, STYLES_DIR, {
      extension: "!(*.module).css",
    }),
    output: getCssOutputOptions("./dist"),
    perf: isDev,
    plugins: [
      ...bundleCss(import.meta.url, STYLES_DIR, { extension: "*.css" }),
      ...devPlugins,
    ],
  },
];

export default config;
