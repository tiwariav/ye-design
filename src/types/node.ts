import { ProcessEnv as CustomProcessEnv } from "./interfaces/processEnv.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CustomProcessEnv {}
  }
}
