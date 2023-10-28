import { Meta } from "@storybook/react";
import { ComponentProps } from "react";

import { LoremCard } from "../../__stories/CardTemplates.js";
import Details from "./index.js";

export const Template = (args: ComponentProps<typeof Details>) => (
  <Details {...args}>
    {Array.from({ length: 4 }, () => (
      <LoremCard />
    ))}
  </Details>
);

const metadata: Meta<typeof Details> = {
  component: Details,
  render: Template,
};

export default metadata;

export const Basic = {
  args: {
    contentSide: "Some Extra Content",
    hasSeparator: true,
    headerMain: "Title",
    headerSide: "Some Extra Header",
  },
};
