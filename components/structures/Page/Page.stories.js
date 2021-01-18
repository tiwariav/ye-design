import React from "react";
import { Basic as HeroBasic } from "../../atoms/sections/Hero/Hero.stories";
import { Basic as SidenavBasic } from "../../structures/Sidenav/Sidenav.stories";
import {
  Basic as TopnavBasic,
  HangingLogo as TopnavHangingLogo,
} from "../../structures/Topnav/Topnav.stories";
import {
  Basic as CollectionBasic,
  FixedColumns as CollectionFixedColumns,
  Grid as CollectionGrid,
} from "../../templates/Collection/Collection.stories";
import { Details } from "../../templates/Details/Details.stories";
import { Profile } from "../../templates/Profile/Profile.stories";
import Page from "./Page";

const topnavMap = {
  TopnavHangingLogo: <TopnavHangingLogo {...TopnavHangingLogo.args} />,
  TopnavBasic: <TopnavBasic {...TopnavBasic.args} />,
};
const sidenavMap = {
  SidenavBasic: <SidenavBasic {...SidenavBasic.args} withHanging />,
};
const heroMap = { HeroBasic: <HeroBasic {...HeroBasic.args} /> };
const templateMap = {
  Details,
  Profile,
  CollectionBasic,
  CollectionGrid,
  CollectionFixedColumns,
};

const metadata = {
  title: "ye-ui/structures/Page",
  component: Page,
  argTypes: {
    // creates a specific argType based on the iconMap object
    topnav: { control: { type: "select", options: Object.keys(topnavMap) } },
    sidenav: { control: { type: "select", options: Object.keys(sidenavMap) } },
    hero: { control: { type: "select", options: Object.keys(heroMap) } },
    template: {
      control: { type: "select", options: Object.keys(templateMap) },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "-1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default metadata;

const Template = ({ topnav, sidenav, hero, template, ...args }) => {
  const Content = templateMap[template];
  return (
    <Page
      topnav={topnavMap[topnav]}
      sidenav={sidenavMap[sidenav]}
      hero={heroMap[hero]}
      {...args}
    >
      <Content {...Content.args} />
    </Page>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  topnav: "TopnavHangingLogo",
  topnavIsFixed: true,
  sidenav: "SidenavBasic",
  sidenavIsSticky: true,
  template: "CollectionBasic",
};

export const WithHero = Template.bind({});
WithHero.args = {
  ...Basic.args,
  topnav: "TopnavHangingLogo",
  sidenav: "SidenavBasic",
  hero: "HeroBasic",
};
