import { Meta, StoryObj } from "@storybook/react";
import { IconMenu } from "@tabler/icons-react";
import { loremIpsum } from "lorem-ipsum";
import { ComponentProps } from "react";
import { randomGradientGenerator } from "wo-library/tools/colors.js";

import LayoutContext from "../../../contexts/LayoutContext/index.js";
import { BasicSideNav } from "../../__stories/SideNavTemplates.js";
import Button from "../../atoms/Button/Button.js";
import SideNav, { SideNavToggle } from "./SideNav.js";
import { SideNavTitle } from "./SideNavGroup.js";

const SideNavButton = ({ ...props }) => {
  const {
    sideNav: { isToggled },
  } = LayoutContext.useContextState();
  const {
    dispatch: { updateSideNav },
  } = LayoutContext.useContextDispatch();

  return (
    <>
      <Button
        variant="borderless"
        {...props}
        onClick={() => updateSideNav({ isToggled: !isToggled })}
      >
        <IconMenu />
      </Button>
    </>
  );
};

const Template = (args: ComponentProps<typeof BasicSideNav>) => (
  <LayoutContext.LayoutProvider>
    <div
      className="story-bg-container story-flex"
      style={{ backgroundImage: randomGradientGenerator(20) }}
    >
      <div className="story-flex">
        <BasicSideNav {...args} />
      </div>
      <div>
        <SideNavButton />
        <div
          dangerouslySetInnerHTML={{
            __html: loremIpsum({
              count: 10,
              format: "html",
              units: "paragraphs",
            }),
          }}
          style={{ maxWidth: 400 }}
        />
      </div>
    </div>
  </LayoutContext.LayoutProvider>
);

const metadata: Meta<typeof SideNav> = {
  component: SideNav,
  render: Template,
};

export default metadata;

type Story = StoryObj<typeof SideNav>;

export const Basic: Story = {};

export const Sticky: Story = {
  args: { sticky: true },
  render: (args) => (
    <div className="story-flex">
      <Template
        {...args}
        toggleIcon={
          <SideNavTitle icon={<SideNavToggle />}>Sticky</SideNavTitle>
        }
      />
      <Template
        groups={3}
        {...args}
        sticky={{ bottom: true }}
        toggleIcon={
          <SideNavTitle icon={<SideNavToggle />}>Sticky Bottom</SideNavTitle>
        }
      />
    </div>
  ),
};
export const FullHeight: Story = {
  args: { isFullHeight: true },
};
