import PasswordInput from "./PasswordInput.js";

const metadata = {
  component: PasswordInput,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  return (
    <div style={{ width }}>
      <PasswordInput {...args} />
    </div>
  );
};

export const Basic = {
  args: {
    placeholder: "Enter your password",
    width: 240,
  },
  render: (args) => <Template {...args} />,
};
