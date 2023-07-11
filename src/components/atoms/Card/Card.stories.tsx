import { ElementType, ReactElement, ReactNode } from "react";

import { Basic as ImageBasic } from "../Image/Image.stories.js";
import Text from "../Text/Text.js";
import Card from "./Card.js";

const imageMap = { ImageBasic, None: null };

const metadata = {
  argTypes: {
    image: { control: { options: Object.keys(imageMap), type: "select" } },
  },
  component: Card,
};

export default metadata;

const Template = ({
  children,
  image,
  isLoading,
  width,
  ...args
}: {
  children: ReactNode;
  image: keyof typeof imageMap;
  isLoading: boolean;
  width: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Image = imageMap[image];
  return (
    <Card
      image={
        Image && (
          <Image {...ImageBasic.args} aspectRatio="1/1" isLoading={isLoading} />
        )
      }
      style={{ width }}
      {...args}
    >
      <Text isLoading={isLoading} minLines={1}>
        {children}
      </Text>
    </Card>
  );
};

export const Basic = {
  args: {
    children: "Card content",
    isLoading: false,
    width: 160,
  },
  render: (args) => <Template {...args} />,
};

export const WithImage = {
  args: {
    ...Basic.args,
    image: "ImageBasic",
    variant: "borderless",
  },
  render: (args) => <Template {...args} />,
};

export const Horizontal = {
  args: {
    children: "Card content",
    image: "ImageBasic",
    isLoading: false,
    layout: "horizontal",
    variant: "borderless",
  },
  render: (args) => <Template {...args} />,
};
