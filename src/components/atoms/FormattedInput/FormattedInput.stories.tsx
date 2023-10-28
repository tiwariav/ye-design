import { expect } from "@storybook/jest";
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { isString } from "lodash-es";
import { useEffect, useRef, useState } from "react";

import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import { InputFormValue } from "../TextInput/TextInput.js";
import FormattedInput, { FormattedInputProps } from "./FormattedInput.js";

const metadata = {
  argTypes: {
    iconAfter: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
    iconBefore: { mapping: storyIconMap, options: Object.keys(storyIconMap) },
  },
  component: FormattedInput,
};

export default metadata;

type Story = StoryObj<typeof FormattedInput>;

function addHyphens(value: InputFormValue) {
  return isString(value)
    ? [...value].filter((item) => item !== "-").join("-")
    : String(value);
}

function removeHyphens(
  value: number | string | undefined,
  emptyValue: InputFormValue,
) {
  return isString(value) ? value.replaceAll("-", "") : emptyValue;
}

const TEST_VALUES = {
  empty: "apple",
  emptyString: "",
  hyphenated: "1-2-3-4-5-6-7-8-9-0",
  number: 1_234_567_890,
  string: "1234567890",
} as const;

const play: Record<string, Story["play"]> = {
  formatOnly: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("test-id-formattedInputText");
    // get the hidden readonly input element
    const hiddenInput = canvas.getByTestId("test-id");

    await userEvent.click(input);
    await userEvent.type(input, TEST_VALUES.string);
    await expect(input).toHaveValue(TEST_VALUES.hyphenated);
    await expect(hiddenInput).toHaveValue(TEST_VALUES.hyphenated);
    await userEvent.clear(input);
    await expect(input).toHaveValue(TEST_VALUES.emptyString);
    await expect(hiddenInput).toHaveValue(TEST_VALUES.empty);
  },

  formatParse: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const hiddenInput = canvas.getByTestId("test-id");

    await userEvent.click(input);
    await userEvent.type(input, TEST_VALUES.string);
    await expect(input).toHaveValue(TEST_VALUES.hyphenated);

    await userEvent.clear(input);
    await expect(input).toHaveValue(TEST_VALUES.emptyString);
    await expect(hiddenInput).toHaveValue(TEST_VALUES.empty);
  },

  parseOnly: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("test-id-formattedInputText");
    // get the hidden readonly input element
    const hiddenInput = canvas.getByTestId("test-id");

    await userEvent.click(input);
    await userEvent.type(input, TEST_VALUES.string);
    await expect(input).toHaveValue(TEST_VALUES.string);
    await expect(hiddenInput).toHaveValue(TEST_VALUES.hyphenated);

    await userEvent.clear(input);
    await expect(input).toHaveValue(TEST_VALUES.emptyString);
    await expect(hiddenInput).toHaveValue(TEST_VALUES.empty);
  },
} as const;

const Template = (args: FormattedInputProps) => {
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState<InputFormValue>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) setRefValue(ref.current.value);
  }, [eventValue]);

  return (
    <div>
      <FormattedInput
        data-testid="test-id-formattedInputText"
        emptyValue={TEST_VALUES.empty}
        hiddenInputProps={{
          ...args.hiddenInputProps,
          "data-testid": "test-id",
        }}
        onChange={(event, value) => {
          setEventValue(event.target.value);
          setParsedValue(value);
        }}
        placeholder="Enter your text"
        ref={ref}
        {...args}
      />
      {eventValue !== undefined && (
        <div style={{ fontSize: "0.875rem" }}>
          <p>
            Event Value: <strong>{eventValue}</strong>{" "}
            <em>({typeof eventValue})</em>
          </p>
          <p>
            Ref Value: <strong>{refValue}</strong> <em>({typeof refValue})</em>
          </p>
          <p>
            Parsed Value: <strong>{parsedValue}</strong>{" "}
            <em>({typeof parsedValue})</em>
          </p>
        </div>
      )}
    </div>
  );
};

export const Basic: Story = {
  args: {
    format: addHyphens,
    parse: removeHyphens,
  },
  play: play.formatParse,
  render: (args) => <Template {...args} />,
};

export const FormatOnly: Story = {
  args: {
    format: addHyphens,
  },
  play: play.formatOnly,
  render: (args) => <Template {...args} />,
};

export const ParseOnly: Story = {
  args: {
    parse: addHyphens,
  },
  play: play.parseOnly,
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = (args: FormattedInputProps) => {
  const [value, setValue] = useState("Apples");
  return (
    <div>
      <Button onClick={() => setValue(value + "a")}>Update</Button>
      <Template {...args} value={value} />
    </div>
  );
};

export const PresetValue: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};
