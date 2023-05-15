import { useForm } from "react-hook-form";
import { JSONTree } from "react-json-tree";
import NumberInput from "../NumberInput/NumberInput.js";
import HookFormInputWrapper from "./HookFormInputWrapper.js";

const metadata = {
  component: HookFormInputWrapper,
};

export default metadata;

function InputWrapper({ name, control, ...props }) {
  return (
    <HookFormInputWrapper control={control} name={name}>
      <NumberInput size="small" variant="material" label={name} {...props} />
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
        <InputWrapper name={"NumberInput"} control={control} />
        <InputWrapper
          name={"NumberInput fraction 0 "}
          control={control}
          parse
          emptyValue={null}
          format={{ maximumFractionDigits: 0 }}
        />
        <InputWrapper name={"NumberInput (parse)"} control={control} format />
        <InputWrapper
          name={"NumberInput (format and empty value)"}
          control={control}
          format
          emptyValue={null}
        />
        <InputWrapper
          name={"NumberInput (format & parse)"}
          control={control}
          format
          parse
        />
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
