import { useState } from "react";
import { useForm } from "react-hook-form";
import { JSONTree } from "react-json-tree";

import NumberInput from "../NumberInput/NumberInput.js";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput.js";
import { Button } from "../index.js";
import HookFormInputWrapper from "./HookFormInputWrapper.js";

const metadata = {
  component: HookFormInputWrapper,
};

export default metadata;

function InputWrapper({ control, name, ...props }) {
  return (
    <HookFormInputWrapper control={control} name={name}>
      <NumberInput label={name} size="small" variant="material" {...props} />
    </HookFormInputWrapper>
  );
}

const Template = () => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      "NumberInput (format with default)": "1234.1003",
    },
    mode: "onChange",
  });
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
        <InputWrapper control={control} name={"NumberInput"} />
        <InputWrapper control={control} format name={"NumberInput (format)"} />
        <InputWrapper
          control={control}
          format
          formatOptions={{ maximumFractionDigits: 4 }}
          name={"NumberInput (format with default)"}
        />
        <InputWrapper
          control={control}
          emptyValue={null}
          format
          name={"NumberInput (format and empty value)"}
        />
        <InputWrapper
          control={control}
          format
          name={"NumberInput (format & parse)"}
          parse
        />
        <HookFormInputWrapper control={control} name="Phone number">
          <PhoneNumberInput
            label="Phone number"
            size="small"
            variant="material"
          />
        </HookFormInputWrapper>
        <div>
          <label>Input</label>:{" "}
          <HookFormInputWrapper control={control} name="input">
            <input />
          </HookFormInputWrapper>
        </div>
        <div>
          <Button
            onClick={() => {
              setValue("NumberInput (format with default)", updateValue + 0.01);
              setUpdateValue(updateValue + 0.01);
            }}
          >
            Update Value
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

export const Basic = {
  render: (args) => <Template {...args} />,
};
