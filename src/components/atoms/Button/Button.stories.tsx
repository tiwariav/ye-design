import { Meta, StoryObj } from "@storybook/react";

import { COMPONENT_SIZES } from "../../../tools/constants/props.js";
import { storyIconMap } from "../../../tools/storybook.js";
import Button, {
  BUTTON_EFFECTS,
  BUTTON_SPACINGS,
  BUTTON_VARIANTS,
} from "./Button.js";

const metadata: Meta<typeof Button> = {
  argTypes: {
    iconAfter: {
      mapping: storyIconMap,
      options: Object.keys(storyIconMap),
    },
    iconBefore: {
      mapping: storyIconMap,
      options: Object.keys(storyIconMap),
    },
  },
  args: {
    children: "Button",
  },
  component: Button,
  render: (args) => <Button {...args} />,
};

export default metadata;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {};

export const WithIcon: Story = {
  args: {
    ...Basic.args,
    iconAfter: "IconSquareRoundedChevronLeftFilled",
    iconBefore: "IconSquareRoundedChevronRightFilled",
  },
};

export const Effects: Story = {
  render: (args) => (
    <div className="story-grid">
      <div>
        <Button {...args}>Button</Button>
      </div>
      {BUTTON_EFFECTS.map((effect) => (
        <div key={effect}>
          <Button effects={[effect]} {...args}>
            &apos;{effect}&apos; Button
          </Button>
        </div>
      ))}
      <div>
        <Button effects={[...BUTTON_EFFECTS]} {...args}>
          All effects Button
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="story-grid">
      <div>
        <Button variant="outlined" {...args}>
          Button
        </Button>
      </div>
      {COMPONENT_SIZES.map((size) => (
        <div key={size}>
          <Button size={size} variant="outlined" {...args}>
            &apos;{size}&apos; Button
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Spacings: Story = {
  render: (args) => (
    <div className="story-grid">
      <div>
        <Button variant="outlined" {...args}>
          Button
        </Button>
      </div>
      {BUTTON_SPACINGS.map((spacing) => (
        <div key={spacing}>
          <Button spacing={spacing} variant="outlined" {...args}>
            &apos;{spacing}&apos; Button
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="story-grid">
      {BUTTON_VARIANTS.map((variant) => (
        <div key={variant}>
          <Button variant={variant} {...args}>
            &apos;{variant}&apos; button
          </Button>
        </div>
      ))}
    </div>
  ),
};
