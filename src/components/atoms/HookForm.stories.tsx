import { FieldValues } from "react-hook-form";

import HookForm, { HookFormProps } from "./HookForm.js";
import { HookFormInputWrapper } from "./index.js";

const meta = {
  component: HookForm,
};

export default meta;

function Template<TFeildValue extends FieldValues>(
  args: HookFormProps<TFeildValue>,
) {
  return (
    <HookForm {...args}>
      <HookFormInputWrapper name={"input"}>
        <input type="text" />
      </HookFormInputWrapper>
    </HookForm>
  );
}
export const Default = {
  args: {},
  render: Template,
};

export const WithErrors = {
  args: {
    errors: {
      input: "This is an error",
    },
  },
  render: Template,
};
