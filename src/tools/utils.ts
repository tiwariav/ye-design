import { isNil } from "lodash-es";

export function isEmpty(params) {
  return isNil(params) || params === "";
}
