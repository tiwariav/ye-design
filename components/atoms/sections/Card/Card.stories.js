import React from "react";
import { Basic as ImageBasic } from "../../content/Image/Image.stories";
import Text from "../../content/Text/Text";
import Card from "./Card";

const imageMap = { None: null, ImageBasic };

const metadata = {
  title: "ye-ui/atoms/sections/Card",
  component: Card,
  argTypes: {
    image: { control: { type: "select", options: Object.keys(imageMap) } },
  },
};

export default metadata;

const Template = ({ image, width, children, loading, ...args }) => {
  const Image = imageMap[image];
  return (
    <Card
      image={
        Image ? (
          <Image {...ImageBasic.args} loading={loading} aspectRatio="1/1" />
        ) : null
      }
      style={{ width }}
      {...args}
    >
      <Text minLines={1} loading={loading}>
        {children}
      </Text>
    </Card>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  width: 160,
  children: "Card content",
  loading: false,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Basic.args,
  variant: "borderless",
  image: "ImageBasic",
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  children: "Card content",
  variant: "borderless",
  image: "ImageBasic",
  layout: "horizontal",
  loading: false,
};
