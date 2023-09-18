import _typescript from "@rollup/plugin-typescript";
import { defaultImport } from "default-import";
import _postcss from "rollup-plugin-postcss";
import {
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

const postcss = defaultImport(_postcss);
const typescript = defaultImport(_typescript);

const isDev = Boolean(process.env.ROLLUP_WATCH);
const STYLES_DIR = "src/styles";

const config = [
  {
    input: rollupInputMap(import.meta.url, "src"),
    output: esOutputOptions,
    perf: isDev,
    plugins: [
      ...commonPlugins,
      postcss(postcssConfig),
      typescript({ tsconfig: "./tsconfig.rollup.json" }),
      ...getBuildPlugins(),
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
