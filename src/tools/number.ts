import { isFinite, isNumber, isString } from "lodash-es";

interface FormatNumberProps extends Intl.NumberFormatOptions {
  fractionDigits?: number;
  nullValue?: string;
}

export function formatNumber(
  value,
  {
    nullValue,
    fractionDigits = 2,
    maximumFractionDigits,
    minimumFractionDigits,
    ...options
  }: FormatNumberProps = {}
) {
  const number = stringToNumber(value, nullValue);
  if (!isFinite(number)) {
    return nullValue;
  }
  const adjustedMinFractionDigits = Math.max(
    minimumFractionDigits ?? fractionDigits,
    isString(value) && value.endsWith(".") ? 1 : 0
  );
  return number.toLocaleString("en-IN", {
    maximumFractionDigits: Math.max(
      maximumFractionDigits ?? fractionDigits,
      adjustedMinFractionDigits
    ),
    minimumFractionDigits: adjustedMinFractionDigits,
    ...options,
  });
}

interface FormatNumberSuffixProps extends FormatNumberProps {
  suffix?: string;
}

export function formatNumberWithSuffix(
  value,
  { nullValue = "--", suffix = "", ...options }: FormatNumberSuffixProps = {}
) {
  let parsedNumber = Number.parseFloat(value);
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
  return `${formatNumber(parsedNumber, options)}${suffixString}`;
}

export function stringToNumber(value, nanValue?: any) {
  if (isNumber(value)) return value;
  const number = Number.parseFloat(
    isString(value) ? value.replace(/,/g, "") : value
  );
  if (nanValue && Number.isNaN(number)) return nanValue;
  return number;
}

export function ordinalNumber(value) {
  if (!value) {
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
