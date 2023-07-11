import { Horizontal as CardHorizontal } from "../../atoms/Card/Card.stories.js";
import DetailsTemplate from "./index.js";

const metadata = {
  component: DetailsTemplate,
};

export default metadata;

const Template = ({ content, ...args }) => (
  <DetailsTemplate {...args}>
    {Array.from({ length: 4 }).fill(
      <CardHorizontal {...CardHorizontal.args}>
        Expedita possimus dolor est unde possimus. Velit est qui alias veritatis
        a reprehenderit. Eos minus velit dolorem dolorem voluptatem molestiae
        odio et dolor.
      </CardHorizontal>,
    )}
  </DetailsTemplate>
);

export const Details = {
  args: {
    contentSide: "Some Extra Content",
    hasSeparator: true,
    headerMain: "Title",
    headerSide: "Some Extra Header",
  },
  render: (args) => <Template {...args} />,
};
