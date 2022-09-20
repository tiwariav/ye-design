import beep from "@rollup/plugin-beep";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import cssnano from "cssnano";
import fs from "fs";
import path from "path";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssImport from "postcss-import";
import postcssNormalize from "postcss-normalize";
import postcssPresetEnv from "postcss-preset-env";
import autoExternal from "rollup-plugin-auto-external";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import progress from "rollup-plugin-progress";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

const isDev = Boolean(process.env.ROLLUP_WATCH);
const postcssPluginOptions = {
  extensions: [".css"],
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
const plugins = [
  autoExternal(),
  resolve(),
  commonjs(),
  postcss(postcssPluginOptions),
  sizeSnapshot(),
  progress(),
  ...(isDev ? [beep(), visualizer()] : [terser()]),
];

const output = {
  dir: "./lib",
  entryFileNames: "[name].js",
  chunkFileNames: "chunks/[name]-[hash].js",
  format: "es",
  minifyInternalExports: !isDev,
  sourcemap: isDev,
};

function walkIndex(dir) {
  const response = {};
  const files = fs.readdirSync(dir);
  for (const file of files) {
    var filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (filepath.includes("/cjs") || filepath.includes("__")) {
      continue;
    }
    const indexFile = filepath + "/index.ts";
    if (stats.isDirectory() && fs.existsSync(indexFile)) {
      response[filepath.replace("src/", "")] = indexFile;
    }
  }
  return response;
}

function walk(
  dir,
  { includeDirs = false, ext = "ts" } = { includeDirs: false, ext: "ts" }
) {
  const response = {};
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    let destPath = filePath;
    const stats = fs.statSync(filePath);
    const indexFile = `/index.${ext}`;
    if (includeDirs && stats.isDirectory()) {
      destPath += indexFile;
    } else if (!filePath.endsWith(ext) || filePath.endsWith(indexFile)) {
      continue;
    }
    response[filePath.replace("src/", "").replace(`.${ext}`, "")] = destPath;
  }
  return response;
}

function bundleCss() {
  const config = [];
  const files = walk("src/styles", { ext: "css" });
  for (const [key, value] of Object.entries(files)) {
    config.push(
      postcss({
        ...postcssPluginOptions,
        include: value,
        extract: key + ".css",
      })
    );
  }
  return config;
}

export default [
  {
    input: {
      components: "src/components/index.ts",
      "components/atoms": "src/components/atoms/index.ts",
      // "components/molecules": "src/components/molecules/index.ts",
      "components/structures": "src/components/structures/index.ts",
      "components/templates": "src/components/templates/index.ts",
      hooks: "src/hooks/index.ts",
      ...walk("src/tools"),
      ...walk("src/styles", { includeDirs: true }),
      ...walk("src/components"),
    },
    output,
    plugins: [...plugins, del({ targets: "lib/**/*" }), typescript()],
    perf: isDev,
  },
  {
    input: {
      ...walk("src/styles", { ext: "css" }),
    },
    output: {
      dir: "./lib",
      entryFileNames: "[name].css",
      format: "es",
    },
    plugins: [
      ...bundleCss(),
      sizeSnapshot(),
      progress(),
      del({ targets: "lib/tmp/**/*" }),
      ...(isDev ? [beep(), visualizer()] : []),
    ],
    perf: isDev,
  },
  {
    input: {
      ...walk("src/tools/cjs", { includeDirs: true, ext: "cjs" }),
    },
    output: { ...output, format: "cjs", exports: "auto" },
    plugins,
    perf: isDev,
  },
];
