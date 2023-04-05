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

export const Basic = {
  args: {
    children: "Card content",
    loading: false,
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
    layout: "horizontal",
    loading: false,
    variant: "borderless",
  },
  render: (args) => <Template {...args} />,
};
