import { isFinite, isNumber, isString } from "lodash-es";

export interface FormatNumberOptions extends Intl.NumberFormatOptions {
  fractionDigits?: number;
  nullValue?: string;
}

export function formatNumber(
  value: number | string,
  {
    fractionDigits = 2,
    maximumFractionDigits,
    minimumFractionDigits,
    nullValue,
    ...options
  }: FormatNumberOptions = {}
) {
  const number = stringToNumber(value, nullValue);
  if (!isFinite(number)) {
    return nullValue;
  }
  const adjustedMinFractionDigits = Math.max(
    minimumFractionDigits ?? fractionDigits,
    isString(value) && value.endsWith(".") ? 1 : 0
  );
  return number?.toLocaleString("en-IN", {
    maximumFractionDigits: Math.max(
      maximumFractionDigits ?? fractionDigits,
      adjustedMinFractionDigits
    ),
    ...options,
  });
}

export interface FormatNumberSuffixOptions extends FormatNumberOptions {
  suffix?: string;
}

export function formatNumberWithSuffix(
  value: number | string,
  { nullValue, suffix = "", ...options }: FormatNumberSuffixOptions = {}
) {
  let parsedNumber = isNumber(value) ? value : Number.parseFloat(value);
  if (Number.isNaN(parsedNumber)) {
    return nullValue;
  }

  let suffixString = suffix;
  if ((!suffix && Math.abs(parsedNumber) >= 10_000_000) || suffix === "Cr") {
    parsedNumber /= 10_000_000;
    suffixString = "Cr";
  } else if ((!suffix && Math.abs(parsedNumber) >= 100_000) || suffix === "L") {
    parsedNumber /= 100_000;
    suffixString = "L";
  } else if ((!suffix && Math.abs(parsedNumber) >= 1000) || suffix === "K") {
    parsedNumber /= 1000;
    suffixString = "K";
  }
  if (suffixString) {
    suffixString = ` ${suffixString}`;
  }
  const formattedNumber = formatNumber(parsedNumber, options);
  return formattedNumber === undefined
    ? ""
    : `${formattedNumber}${suffixString}`;
}

export type NumberLike = null | number | string | undefined;

export function stringToNumber(value: number | string, nanValue?: NumberLike) {
  if (isNumber(value)) return value;
  const number = Number.parseFloat(
    isString(value) ? value.replaceAll(",", "") : value
  );
  if (Number.isNaN(number)) return nanValue;
  return number;
}

export function ordinalNumber(value: number) {
  if (!isNumber(value)) {
    return value;
  }
  switch (value) {
    case 1: {
      return "1st";
    }
    case 2: {
      return "2nd";
    }
    case 3: {
      return "3rd";
    }
    default: {
      return `${value}th`;
    }
  }
}
