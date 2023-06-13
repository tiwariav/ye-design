import { useRef } from "react";

import { Anchor } from "../../atoms/index.js";
import CardLink from "./CardLink.js";

const metadata = {
  component: CardLink,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  const linkRef = useRef(null);

  return (
    <div style={{ width }}>
      <CardLink linkRef={linkRef} {...args}>
        <Anchor href="#nowhere" ref={linkRef}>
          Main Link
        </Anchor>
        <div>Some more content</div>
      </CardLink>
    </div>
  );
};

export const Basic = {
  args: {
    width: 240,
  },
  render: (args) => <Template {...args} />,
};
