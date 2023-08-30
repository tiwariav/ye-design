import type { StoryObj } from "@storybook/react";
import type { SetRequired } from "type-fest";

import { useState } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { JSONTree } from "react-json-tree";

import HookForm, { type HookFormProps } from "../HookForm.js";
import NumberInput, { type NumberInputProps } from "../NumberInput/NumberInput.js";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput.js";
import { Button } from "../index.js";
import HookFormInputWrapper from "./HookFormInputWrapper.js";

const metadata = {
  component: HookFormInputWrapper,
};

export default metadata;

type Story = StoryObj<typeof HookFormInputWrapper>;

type FormData = {
  "NumberInput": string;
  "NumberInput (format & parse)": number;
  "NumberInput (format and empty value)": string;
  "NumberInput (format with default)": string;
  "NumberInput (format)": string;
  "Phone number": string;
  input: string;
}

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

const FormContent = () => {
  const { setValue, watch } = useFormContext();
  const [updateValue, setUpdateValue] = useState(2000.001);
  const watchAll = watch();
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
          format={{ maximumFractionDigits: 4 }}
          name="NumberInput (format with default)"
        />
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
        <div>
          <Button
            onClick={() => {
              setValue(
                "NumberInput (format with default)",
                (updateValue + 0.01).toString(),
              );
              setUpdateValue(updateValue + 0.01);
            }}
            type="submit"
          >
            Update Value / Submit
          </Button>
        </div>
      </div>
      <div style={{ fontSize: ".75rem", fontWeight: 500, marginTop: "1rem" }}>
        <div>Values:</div>
        <JSONTree data={watchAll} />
      </div>
    </div>
  );
};

const Template = (args: Omit<HookFormProps<FormData>, "children">) => {
  return (
    <HookForm
      defaultValues={{
        "NumberInput (format with default)": "1234.1003",
      }}
      mode="onChange"
      {...args}
    >
      <FormContent />
    </HookForm>
  );
};

const handleSubmit: SubmitHandler<FormData> = (data) => {
  window.alert(JSON.stringify(data, null, 2));
};

export const Basic: Story = {
  render: () => <Template onValid={handleSubmit} />,
};

