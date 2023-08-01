import { useForm } from "react-hook-form";
import { JSONTree } from "react-json-tree";

import NumberInput from "../NumberInput/NumberInput.js";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput.js";
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
  const { control, watch } = useForm({
    mode: "onChange",
  });
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
