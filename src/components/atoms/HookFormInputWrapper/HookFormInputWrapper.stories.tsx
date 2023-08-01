import { StoryObj } from "@storybook/react";
import { useWatch } from "react-hook-form";
import { JSONTree } from "react-json-tree";
import { SetRequired } from "type-fest";

import HookForm from "../HookForm.js";
import NumberInput, { NumberInputProps } from "../NumberInput/NumberInput.js";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput.js";
import HookFormInputWrapper from "./HookFormInputWrapper.js";

const metadata = {
  component: HookFormInputWrapper,
};

export default metadata;

type Story = StoryObj<typeof HookFormInputWrapper>;

function InputWrapper({
  name,
  ...props
}: SetRequired<NumberInputProps, "name">) {
  return (
    <HookFormInputWrapper name={name}>
      <NumberInput label={name} size="small" variant="material" {...props} />
    </HookFormInputWrapper>
  );
}

function FormContent() {
  const watchAll = useWatch();
  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <InputWrapper name="NumberInput" />
        <InputWrapper format name="NumberInput (format)" />
        <InputWrapper
          emptyValue={null}
          format
          name="NumberInput (format and empty value)"
        />
        <InputWrapper format name="NumberInput (format & parse)" parse />
        <HookFormInputWrapper name="Phone number">
          <PhoneNumberInput
            label="Phone number"
            size="small"
            variant="material"
          />
        </HookFormInputWrapper>
        <div>
          <label>Input</label>:{" "}
          <HookFormInputWrapper name="input">
            <input />
          </HookFormInputWrapper>
        </div>
      </div>
      <div style={{ fontSize: ".75rem", fontWeight: 500, marginTop: "1rem" }}>
        <div>Values:</div>
        <JSONTree data={watchAll} />
      </div>
    </div>
  );
}

const Template = () => {
  return (
    <HookForm mode="onChange">
      <FormContent />
    </HookForm>
  );
};

export const Basic: Story = {
  render: () => <Template />,
};
