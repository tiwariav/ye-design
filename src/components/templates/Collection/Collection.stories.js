import { WithImage as CardWithImage } from "../../atoms/Card/Card.stories.js";
import Collection from "./index.js";

const metadata = {
  component: Collection,
};

export default metadata;

const Template = ({ cardWidth, content, variant, ...args }) => {
  const cardLayout = variant === "grid" ? "vertical" : "horizontal";
  const itemArgs = {
    ...CardWithImage.args,
    layout: cardLayout,
    style: { width: cardWidth },
  };
  return (
    <Collection {...args} variant={variant}>
      {Array.from({ length: 32 }).fill(
        <CardWithImage {...itemArgs}>
          Expedita possimus dolor est unde possimus. Velit est qui alias
          veritatis a reprehenderit. Eos minus velit dolorem dolorem voluptatem
          molestiae odio et dolor.
        </CardWithImage>,
      )}
    </Collection>
  );
};

export const Basic = {
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
  render: (args) => <Template {...args} />,
};

export const FixedColumns = {
  args: {
    ...Basic.args,
    columns: 2,
    title: "A list of items, with fixed number of columns",
  },
  render: (args) => <Template {...args} />,
};

export const Grid = {
  args: {
    ...Basic.args,
    title: "A grid of items",
    variant: "grid",
  },
  render: (args) => <Template {...args} />,
};
