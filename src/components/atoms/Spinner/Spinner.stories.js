import SpinnerComponent from "./Spinner.js";

const metadata = {
  argTypes: {
    color: { control: "color" },
  },
  component: SpinnerComponent,
};

export default metadata;

const Template = ({ width, height, color, ...args }) => (
  <div style={{ position: "relative" }}>
    <SpinnerComponent style={{ color, height, width }} {...args} />
  </div>
);

export const Spinner = {
  args: {
    color: "var(--ye-color-primary)",
    height: 48,
    width: 48,
  },
  render: (args) => <Template {...args} />,
};
