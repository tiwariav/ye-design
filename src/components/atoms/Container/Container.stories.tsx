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
      <Container className="story-bordered" {...args}>
        No align
      </Container>
      <Container align="center" className="story-bordered" {...args}>
        &apos;center&apos; align
      </Container>
    </div>
  ),
};

export const Height: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container className="story-bordered" {...args}>
        {children}
      </Container>
      {CONTAINER_HEIGHTS.map((height) => (
        <Container
          className="story-bordered"
          height={height}
          key={height}
          {...args}
        >
          <p>&apos;{height}&apos; height</p>
          {Array.from({ length: 10 }).map((_item, index) => (
            <p key={index}>{metadata.args?.children}</p>
          ))}
        </Container>
      ))}
    </div>
  ),
};

export const Spacings: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container className="story-bordered" {...args}>
        {children}
      </Container>
      {CONTAINER_SPACINGS.map((spacing) => (
        <Container
          className="story-bordered"
          key={spacing}
          spacing={spacing}
          {...args}
        >
          <p>&apos;{spacing}&apos; spacing</p>
          <p>{metadata.args?.children}</p>
        </Container>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: ({ children, ...args }) => (
    <div className="story-grid">
      <Container className="story-bordered" {...args}>
        {children}
      </Container>
      <Container className="story-bordered" variant="secondary" {...args}>
        <p>&apos;secondary&apos; variant</p>
        <p>{metadata.args?.children}</p>
      </Container>
    </div>
  ),
};
export const Widths: Story = {
  render: ({ children, ...args }) => (
    <div className="story-list">
      <Container className="story-bordered" {...args}>
        {children}
      </Container>
      {CONTAINER_WIDTHS.map((width) => (
        <Container
          className="story-bordered"
          key={width}
          width={width}
          {...args}
        >
          <p>&apos;{width}&apos; width</p>
          <p>{metadata.args?.children}</p>
        </Container>
      ))}
    </div>
  ),
};
