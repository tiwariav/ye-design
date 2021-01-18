import React from "react";
import { WithImage as CardWithImage } from "../../atoms/sections/Card/Card.stories";
import Collection from "./Collection";

const metadata = {
  title: "ye-ui/templates/Collection",
  component: Collection,
};

export default metadata;

const Template = ({ content, cardWidth, variant, ...args }) => {
  const cardLayout = variant === "grid" ? "vertical" : "horizontal";
  const itemArgs = {
    ...CardWithImage.args,
    style: { width: cardWidth },
    layout: cardLayout,
  };
  return (
    <Collection {...args} variant={variant}>
      {Array(32).fill(
        <CardWithImage {...itemArgs}>
          Expedita possimus dolor est unde possimus. Velit est qui alias
          veritatis a reprehenderit. Eos minus velit dolorem dolorem voluptatem
          molestiae odio et dolor.
        </CardWithImage>
      )}
    </Collection>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  title: "A list of items",
  filter: [
    {
      name: "Release Date",
      key: "release_date",
      options: ["this week", "this month", "this year"],
    },
    {
      name: "Language",
      key: "language",
      options: ["English"],
    },
  ],
  sort: [
    { name: "Release Date", key: "release_date" },
    { name: "Popularity", key: "popularity" },
  ],
};

export const FixedColumns = Template.bind({});
FixedColumns.args = {
  ...Basic.args,
  title: "A list of items, with fixed number of columns",
  columns: 2,
};

export const Grid = Template.bind({});
Grid.args = {
  ...Basic.args,
  title: "A grid of items",
  variant: "grid",
};
