import CircleProgress from "./CircleProgress.js";

const metadata = {
  argTypes: {
    color: { control: "color" },
  },
  component: CircleProgress,
};

export default metadata;

const Template = (args) => <CircleProgress {...args} />;

export const Basic = {
  args: {
    arcHeight: 100,
    color: "var(--ye-color-primary)",
    progress: [25, 100],
    progressText: "percent",
    squareSize: 100,
  },
  render: (args) => <Template {...args} />,
};
