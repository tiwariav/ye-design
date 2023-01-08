import beep from "@rollup/plugin-beep";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import cssnano from "cssnano";
import { defaultImport } from "default-import";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssImport from "postcss-import";
import postcssNormalize from "postcss-normalize";
import postcssPresetEnv from "postcss-preset-env";
import autoExternal from "rollup-plugin-auto-external";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import progress from "rollup-plugin-progress";
import { walk } from "wo-library/tools/files.js";
// import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";
import _visualizer from "rollup-plugin-visualizer";

const visualizer = defaultImport(_visualizer);

const STYLES_DIR = "src/styles";
const isDev = Boolean(process.env.ROLLUP_WATCH);
const postcssPluginOptions = {
  config: false,
  extensions: [".css"],
  extract: "dist.css",
  modules: { localsConvention: "camelCase" },
  plugins: [
    cssnano({ preset: "default" }),
    postcssImport(),
    postcssFlexbugsFixes(),
    postcssPresetEnv({
      autoprefixer: {
        flexbox: "no-2009",
      },
      features: {
        "custom-media-queries": { preserve: true },
        "custom-properties": true,
        "gap-properties": true,
        "nesting-rules": true,
      },
      stage: 1,
    }),
    // Adds PostCSS Normalize as the reset css with default options,
    // so that it honors browserslist config in package.json
    // which in turn let's users customize the target behavior as per their needs.
    postcssNormalize(),
  ],
  sourceMap: isDev,
};
const corePlugins = [autoExternal(), commonjs()];
const miscPlugins = [
  // sizeSnapshot(),
  progress(),
  ...(isDev ? [beep(), visualizer()] : [terser()]),
];

const output = {
  chunkFileNames: "chunks/[name]-[hash].js",
  dir: "./lib",
  entryFileNames: "[name].js",
  format: "es",
  minifyInternalExports: !isDev,
  sourcemap: isDev,
};

function bundleCss() {
  const config = [];
  const files = walk(STYLES_DIR, { extensions: ["css"] });
  for (const [key, value] of Object.entries(files)) {
    config.push(
      postcss({
        ...postcssPluginOptions,
        extract: key + ".css",
        include: value,
      })
    );
  }
  return config;
}
const config = [
  {
    input: {
      components: "src/components/index.ts",
      "components/atoms": "src/components/atoms/index.ts",
      // "components/molecules": "src/components/molecules/index.ts",
      "components/structures": "src/components/structures/index.ts",
      "components/templates": "src/components/templates/index.ts",
      hooks: "src/hooks/index.ts",
      svg: "src/svg/index.ts",
      ...walk("src/tools"),
      ...walk(STYLES_DIR, { includeDirectories: true }),
      ...walk("src/components"),
    },
    output,
    perf: isDev,
    plugins: [
      ...corePlugins,
      postcss(postcssPluginOptions),
      ...miscPlugins,
      del({ runOnce: true, targets: "lib/**/*" }),
      del({ targets: "lib/chunks/*" }),
      typescript(),
    ],
  },
  {
    input: {
      ...walk(STYLES_DIR, { extensions: ["css"] }),
    },
    output: {
      dir: "./lib",
      entryFileNames: "[name].css",
      format: "es",
    },
    perf: isDev,
    plugins: [
      ...bundleCss(),
      // sizeSnapshot(),
      progress(),
      copy({
        targets: [
          { dest: "lib/assets", src: "assets/**/*" },
          { dest: "lib", src: ["package.json", "README.md"] },
        ],
      }),
      ...(isDev ? [beep(), visualizer()] : []),
    ],
  },
  {
    input: {
      ...walk("src/tools/cjs", {
        extensions: ["cjs"],
        includeDirectories: true,
      }),
    },
    output: {
      ...output,
      entryFileNames: "[name].cjs",
      exports: "auto",
      format: "cjs",
    },
    perf: isDev,
    plugins: [...corePlugins, miscPlugins],
  },
];

export default config;
