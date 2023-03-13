interface FormatNumberProps {
  decimals?: number;
  nullValue?: string;
  decimalPadding?: boolean;
}

export function formatNumber(value, mode = "nodecimal") {
  const decimal = mode === "nodecimal" ? 0 : 2;
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: decimal,
    minimumFractionDigits: 0,
  });
}

export function isValidNumber(inputValue) {
  return (
    !Number.isNaN(Number(inputValue.replace(/,/g, "").replace(".", ""))) &&
    inputValue.indexOf(".") === inputValue.lastIndexOf(".")
  );
}

interface FormatNumberSuffixProps extends FormatNumberProps {
  suffix?: string;
}

export function formatNumberWithSuffix(
  value,
  { nullValue = "--", suffix = "", ...rest }: FormatNumberSuffixProps = {}
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
  return `${formatNumber(parsedNumber)}${suffixString}`;
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
