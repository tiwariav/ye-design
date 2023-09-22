import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useRef } from "react";

import { Anchor } from "../../atoms/index.js";
import CardLink from "./CardLink.js";

const metadata: Meta<typeof CardLink> = {
  component: CardLink,
};

export default metadata;

type Story = StoryObj<typeof CardLink>;

const Template = ({ linkRef, ...args }: ComponentProps<typeof CardLink>) => {
  const innerLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div style={{ width: 240 }}>
      <CardLink linkRef={linkRef || innerLinkRef} {...args}>
        <Anchor href="#nowhere" ref={innerLinkRef}>
          Main Link
        </Anchor>
        <div>Some more content</div>
      </CardLink>
    </div>
  );
};

export const Basic: Story = {
  render: (args) => <Template {...args} />,
};
