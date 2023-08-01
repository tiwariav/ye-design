import { isNil } from "lodash-es";

export function isEmpty(params: any) {
  return isNil(params) || params === "";
}
