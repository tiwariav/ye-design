import { isNil } from "lodash-es";

export function isEmpty(params: any) {
  return isNil(params) || params === "";
}

export function inSubArray<TArray extends [], TValue = TArray[number]>(
  array: readonly unknown[],
  value: unknown,
) {
  const typedValue = value as TValue;
  return array.includes(typedValue) ? typedValue : undefined;
}
