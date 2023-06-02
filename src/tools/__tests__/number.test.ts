import { formatNumber, formatNumberWithSuffix } from "../number.js";

const SOME_STRING = "some string";
const NON_NUMBERS = [
  [[SOME_STRING], undefined],
  [[SOME_STRING, { nullValue: "xx" }], "xx"],
  [[""], undefined],
  [[null], undefined],
  [[], undefined],
];

function testArray(tests) {
  for (const item of tests) {
    const output = formatNumber(item[0][0], item[0][1]);
    expect(output).toBe(item[1]);
  }
}

function testArrayWithSuffix(tests) {
  for (const item of tests) {
    const output = formatNumberWithSuffix(item[0][0], item[0][1]);
    expect(output).toBe(item[1]);
  }
}

describe("format number", () => {
  test("should return null-value for non-numbers", () => {
    testArray(NON_NUMBERS);
  });

  test("should return correct number of decimals", () => {
    const tests = [
      [["1"], "1.00"],
      [["-1"], "-1.00"],
      [["1.001"], "1.00"],
      [["1", { fractionDigits: 1 }], "1.0"],
      [["1", { minimumFractionDigits: 0 }], "1"],
    ];
    testArray(tests);
  });

  test("should round off correctly", () => {
    const tests = [
      [["1.006"], "1.01"],
      [["1.005"], "1.01"],
      [["1.004"], "1.00"],
    ];
    testArray(tests);
  });

  test("should format correctly", () => {
    const tests = [
      [["0"], "0.00"],
      [["-0.002"], "-0.00"],
      [["-0.05"], "-0.05"],
      [["-0.055"], "-0.06"],
      [["0.05"], "0.05"],
      [["0.055"], "0.06"],
      [["1"], "1.00"],
      [["10"], "10.00"],
      [["100"], "100.00"],
      [["1000"], "1,000.00"],
      [["10000"], "10,000.00"],
      [["100000"], "1,00,000.00"],
      [["1000000"], "10,00,000.00"],
      [["10000000"], "1,00,00,000.00"],
      [["100000000"], "10,00,00,000.00"],
      [["1000000000"], "1,00,00,00,000.00"],
      [["10000000000"], "10,00,00,00,000.00"],
    ];
    testArray(tests);
  });
});

describe("format number with suffix", () => {
  test("should return null-value for non-numbers", () => {
    testArrayWithSuffix(NON_NUMBERS);
  });

  test("should format correctly", () => {
    const tests = [
      [["1"], "1.00"],
      [["10"], "10.00"],
      [["100"], "100.00"],
      [["1000"], "1.00 K"],
      [["10000"], "10.00 K"],
      [["100", { suffix: "K" }], "0.10 K"],
      [["1000000", { suffix: "K" }], "1,000.00 K"],
      [["100000"], "1.00 L"],
      [["1000000"], "10.00 L"],
      [["1000", { suffix: "L" }], "0.01 L"],
      [["100000000", { suffix: "L" }], "1,000.00 L"],
      [["10000000"], "1.00 Cr"],
      [["100000000"], "10.00 Cr"],
      [["1000000000"], "100.00 Cr"],
      [["10000000000"], "1,000.00 Cr"],
      [["10000000000", { suffix: "Cr" }], "1,000.00 Cr"],
      [["10000", { fractionDigits: 3, suffix: "Cr" }], "0.001 Cr"],
    ];
    testArrayWithSuffix(tests);
  });
});
