import { Meta } from "@storybook/react";

import ArcProgress from "./ArcProgress.js";

const meta: Meta = {
  component: ArcProgress,
};

export default meta;

const Template = (args) => <ArcProgress {...args} />;

export const Basic = {
  args: {
    progress: [50, 100],
  },
  render: Template,
};
