import { Meta, ReactRenderer, StoryObj } from "@storybook/react";
import { ArgsStoryFn } from "@storybook/types";

import { COMPONENT_FLOAT } from "../../../tools/constants/props.js";
import {
  Basic as ImageBasic,
  Template as ImageTemplate,
} from "../Image/Image.stories.js";
import Card, {
  CARD_FLYING,
  CARD_HEIGHTS,
  CARD_LAYOUTS,
  CARD_VARIANTS,
  CARD_VIEW_MODES,
  CardProps,
} from "./Card.js";

const imageMap = {
  ImageBasic: <ImageTemplate {...ImageBasic.args} />,
  None: null,
};

type TemplateProps = CardProps & { width?: number };
export const Template: ArgsStoryFn<ReactRenderer, TemplateProps> = ({
  width,
  ...args
}) => <Card style={{ width }} {...args} />;

const metadata: Meta<TemplateProps> = {
  argTypes: {
    image: { mapping: imageMap, options: Object.keys(imageMap) },
    width: { control: { max: 320, min: 80, type: "range" } },
  },
  args: {
    children: "Card content",
  },
  component: Card,
  render: Template,
};

export default metadata;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {};

export const WithImage: Story = {
  args: {
    ...Basic.args,
    image: "ImageBasic",
  },
};

export const Layouts: Story = {
  args: {
    ...WithImage.args,
  },
  render: (args) => (
    <div className="story-grid">
      <Card {...args} />
      {CARD_LAYOUTS.map((layout) => (
        <Card layout={layout} {...args} />
      ))}
    </div>
  ),
};

export const Floating: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Card children={children} {...args} />
      {COMPONENT_FLOAT.map((floating) => (
        <Card children={`floating ${floating}`} floating={floating} {...args} />
      ))}
    </div>
  ),
};

export const Flying: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Card children={children} {...args} />
      {CARD_FLYING.map((floating) => (
        <Card children={`flying ${floating}`} flying={floating} {...args} />
      ))}
    </div>
  ),
};

export const Height: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Card children={children} {...args} />
      {CARD_HEIGHTS.map((height) => (
        <Card children={`height ${height}`} height={height} {...args} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  ...WithImage,
  render: ({ children, ...args }) => (
    <div className="story-grid">
      {CARD_VARIANTS.map((variant) => (
        <Card children={`variant ${variant}`} variant={variant} {...args} />
      ))}
    </div>
  ),
};

export const ViewMode: Story = {
  args: {
    image: "ImageBasic",
  },
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Card children={children} {...args} />
      {CARD_VIEW_MODES.map((viewMode) => (
        <Card children={`viewMode ${viewMode}`} viewMode={viewMode} {...args} />
      ))}
    </div>
  ),
};

export const IsBusy: Story = {
  args: {
    ...Basic.args,
    isBusy: true,
  },
};
