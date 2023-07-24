import { isNil } from "lodash-es";

export function isEmpty(params: null | string | undefined) {
  return isNil(params) || params === "";
}
