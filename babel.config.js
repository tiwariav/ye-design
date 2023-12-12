import { getConfig } from "wo-library/tools/babel.js";

export default getConfig({ isDev: process.env.NODE_ENV === "development" });
