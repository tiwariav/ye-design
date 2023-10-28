import { Meta, ReactRenderer, StoryObj } from "@storybook/react";
import { ArgsStoryFn } from "@storybook/types";

import {
  Template as CardTemplate,
  WithImage as CardWithImage,
} from "../../atoms/Card/Card.stories.js";
import Collection, { CollectionProps } from "./index.js";

type TemplateProps = Omit<CollectionProps, "children"> & {
  cardWidth?: number;
  variant?: "grid" | "list";
};

export const Template: ArgsStoryFn<ReactRenderer, TemplateProps> = ({
  cardWidth,
  variant,
  ...args
}) => {
  const itemArgs = {
    ...CardWithImage.args,
    style: { width: cardWidth },
  };
  if (variant === "grid") {
    itemArgs.layout = "horizontal";
  }
  return (
    <Collection {...args} variant={variant}>
      {Array.from({ length: 32 }, (_, index) => (
        <CardTemplate key={index} {...itemArgs}>
          Expedita possimus dolor est unde possimus. Velit est qui alias
          veritatis a reprehenderit. Eos minus velit dolorem dolorem voluptatem
          molestiae odio et dolor.
        </CardTemplate>
      ))}
    </Collection>
  );
};

const metadata: Meta<typeof Collection> = {
  component: Collection,
  render: Template,
};

export default metadata;

type Story = StoryObj<typeof Collection>;

export const Basic: Story = {
  args: {
    filter: [
      {
        key: "release_date",
        name: "Release Date",
        options: ["this week", "this month", "this year"],
      },
      {
        key: "language",
        name: "Language",
        options: ["English"],
      },
    ],
    sort: [
      { key: "release_date", name: "Release Date" },
      { key: "popularity", name: "Popularity" },
    ],
    title: "A list of items",
  },
};

export const FixedColumns = {
  args: {
    ...Basic.args,
    columns: 2,
    title: "A list of items, with fixed number of columns",
  },
};

export const Grid = {
  args: {
    ...Basic.args,
    title: "A grid of items",
    variant: "grid" as const,
  },
};
