export function formatNumber(
  value,
  { decimals = 2, nullValue = "--", decimalPadding = true } = {}
) {
  let parsedNumber = Number.parseFloat(value);
  if (Number.isNaN(parsedNumber)) {
    return nullValue;
  }

  let prefix = "";
  if (parsedNumber < (decimals ? Number(`-0.${"0".repeat(decimals)}5`) : 0)) {
    prefix = "-";
    parsedNumber = Math.abs(parsedNumber);
  }

  const decimalMultiplier = Math.pow(10, decimals);
  let decimalNumber = (
    Math.round((parsedNumber + Number.EPSILON) * decimalMultiplier) /
    decimalMultiplier
  ).toFixed(decimals);
  if (!decimalPadding) {
    decimalNumber = Number.parseFloat(decimalNumber).toFixed(0);
  }
  const parts = decimalNumber.split(".");

  const decimalNumber_ = parts[1] ? `.${parts[1]}` : "";
  let wholeNumber = parts[0];
  const wholeNumberLength = wholeNumber.length;
  if (wholeNumberLength > 3) {
    let crores = "";
    let toSplit = wholeNumber.slice(0, Math.max(0, wholeNumberLength - 3));
    if (wholeNumberLength > 7) {
      crores = `${toSplit.slice(0, Math.max(0, wholeNumberLength - 7))},`;
      toSplit = toSplit.slice(-4);
    }
    toSplit = `${toSplit.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},`;
    wholeNumber = crores + toSplit + wholeNumber.slice(-3);
  }

  const returnValue = wholeNumber + decimalNumber_;
  return prefix + returnValue;
}

export function formatNumberWithSuffix(
  value,
  { nullValue = "--", suffix = "", ...rest } = {}
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
  return `${formatNumber(parsedNumber, rest)}${suffixString}`;
}

export function parseNumber(value) {
  if (value.includes("--")) {
    value = value.replaceAll("--", "");
  }
  const number = Number.parseFloat(value.split(",").join(""));
  if (Number.isNaN(number)) return 0;
  return number;
}

export function ordinalNumber(value) {
  if (!value) {
    return value;
  }
  switch (value) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return `${value}th`;
  }
}
