import { Meta, StoryObj } from "@storybook/react";

import Container, {
  CONTAINER_HEIGHTS,
  CONTAINER_SPACINGS,
  CONTAINER_WIDTHS,
} from "./Container.js";

const metadata: Meta<typeof Container> = {
  args: {
    children: "This is a container. It provides space around content.",
  },
  component: Container,
  render: (args) => <Container className="story-bordered" {...args} />,
};

export default metadata;

type Story = StoryObj<typeof Container>;

export const Basic: Story = {};

export const Align: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container children="No align" className="story-bordered" {...args} />
      <Container
        align="center"
        children="'center' align"
        className="story-bordered"
        {...args}
      />
    </div>
  ),
};

export const Height: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container children={children} className="story-bordered" {...args} />
      {CONTAINER_HEIGHTS.map((height) => (
        <Container
          children={
            <>
              <p>'{height}' height</p>
              {Array.from({ length: 10 }).map(() => (
                <p>{metadata.args?.children}</p>
              ))}
            </>
          }
          className="story-bordered"
          height={height}
          {...args}
        />
      ))}
    </div>
  ),
};

export const Spacings: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container children={children} className="story-bordered" {...args} />
      {CONTAINER_SPACINGS.map((spacing) => (
        <Container
          children={
            <>
              <p>'{spacing}' spacing</p>
              <p>{metadata.args?.children}</p>
            </>
          }
          className="story-bordered"
          spacing={spacing}
          {...args}
        />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container children={children} className="story-bordered" {...args} />
      <Container
        children={
          <>
            <p>'secondary' variant</p>
            <p>{metadata.args?.children}</p>
          </>
        }
        className="story-bordered"
        variant="secondary"
        {...args}
      />
    </div>
  ),
};
export const Widths: Story = {
  render: ({ children, ...args }) => (
    <div className="story-list">
      <Container children={children} className="story-bordered" {...args} />
      {CONTAINER_WIDTHS.map((width) => (
        <Container
          children={
            <>
              <p>'{width}' width</p>
              <p>{metadata.args?.children}</p>
            </>
          }
          className="story-bordered"
          width={width}
          {...args}
        />
      ))}
    </div>
  ),
};
