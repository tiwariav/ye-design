import { isNil } from "lodash-es";

export function isEmpty<TValue>(value: TValue) {
  return isNil(value) || value === "";
}

export function inSubArray<TArray extends [], TValue = TArray[number]>(
  array: readonly unknown[],
  value: unknown,
) {
  const typedValue = value as TValue;
  return array.includes(typedValue) ? typedValue : undefined;
}

export const isBrowser = typeof window !== "undefined" && !!window.document;

export const getDynamicClassName = (styles: unknown, name: string) => {
  /**
   * As a temporary workaround for
   * https://www.npmjs.com/package/typescript-plugin-css-modules#importing-css
   */
  return (styles as Record<string, string>)[name.replaceAll("-", "___")];
};
