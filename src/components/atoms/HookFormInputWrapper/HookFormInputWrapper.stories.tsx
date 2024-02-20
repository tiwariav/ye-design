import { StoryObj } from "@storybook/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { JSONTree } from "react-json-tree";
import { SetRequired } from "type-fest";

import HookForm from "../HookForm.js";
import NumberInput, { NumberInputProps } from "../NumberInput/NumberInput.js";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput.js";
import { Button } from "../index.js";
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

const FormContent = () => {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
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
          <label htmlFor="input">Input</label>:{" "}
          <HookFormInputWrapper name="input">
            <input id="input" />
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
          >
            Update Value
          </Button>
        </div>
      </div>
      <div style={{ fontSize: ".75rem", fontWeight: 500, marginTop: "1rem" }}>
        <div>Errors:</div>
        <JSONTree data={errors} />
        <div>Values:</div>
        <JSONTree data={watchAll} />
      </div>
    </div>
  );
};

const Template = () => {
  return (
    <HookForm
      defaultValues={{
        "NumberInput (format with default)": "1234.1003",
      }}
      mode="onChange"
      resolver={
        // eslint-disable-next-line @typescript-eslint/require-await
        async (values) => {
          const errors: Record<string, { message: string; type: string }> = {};
          for (const key of Object.keys(values)) {
            errors[key] = {
              message: "This field will always fail",
              type: "manual",
            };
          }
          return {
            errors,
            values: {},
          };
        }
      }
    >
      <FormContent />
    </HookForm>
  );
};

export const Basic: Story = {
  render: () => <Template />,
};
