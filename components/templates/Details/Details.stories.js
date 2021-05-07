import React from "react";
import { getStoryName } from "../../../utils/storybook";
import { Horizontal as CardHorizontal } from "../../atoms/sections/Card/Card.stories";
import DetailsTemplate from "./Details";

const metadata = {
  title: getStoryName(__dirname),
  component: DetailsTemplate,
};

export default metadata;

const Template = ({ content, ...args }) => (
  <DetailsTemplate {...args}>
    {Array(4).fill(
      <CardHorizontal {...CardHorizontal.args}>
        Expedita possimus dolor est unde possimus. Velit est qui alias veritatis
        a reprehenderit. Eos minus velit dolorem dolorem voluptatem molestiae
        odio et dolor.
      </CardHorizontal>
    )}
  </DetailsTemplate>
);

export const Details = Template.bind({});
Details.args = {
  headerMain: "Title",
  headerSide: "Some Extra Header",
  contentSide: "Some Extra Content",
  hasSeparator: true,
};
