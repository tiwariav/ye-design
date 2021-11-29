import React from "react";
import { getStoryName } from "../../../utils/storybook";
import { Basic as HeroBasic } from "../../atoms/sections/Hero/Hero.stories";
import { Basic as SideNavBasic } from "../../structures/SideNav/SideNav.stories";
import {
  Basic as TopNavBasic,
  HangingLogo as TopNavHangingLogo,
} from "../../structures/TopNav/TopNav.stories";
import {
  Basic as CollectionBasic,
  FixedColumns as CollectionFixedColumns,
  Grid as CollectionGrid,
} from "../../templates/Collection/Collection.stories";
import { Details } from "../../templates/Details/Details.stories";
import { Profile } from "../../templates/Profile/Profile.stories";
import Page from "./Page";

const topNavMap = {
  TopNavHangingLogo: <TopNavHangingLogo {...TopNavHangingLogo.args} />,
  TopNavBasic: <TopNavBasic {...TopNavBasic.args} />,
};
const sideNavMap = {
  SideNavBasic: <SideNavBasic {...SideNavBasic.args} withHanging />,
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
  title: getStoryName(__dirname),
  component: Page,
  argTypes: {
    // creates a specific argType based on the iconMap object
    topNav: { control: { type: "select", options: Object.keys(topNavMap) } },
    sideNav: { control: { type: "select", options: Object.keys(sideNavMap) } },
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

const Template = ({ topNav, sideNav, hero, template, ...args }) => {
  const Content = templateMap[template];
  return (
    <Page
      topNav={topNavMap[topNav]}
      sideNav={sideNavMap[sideNav]}
      hero={heroMap[hero]}
      {...args}
    >
      <Content {...Content.args} />
    </Page>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  topNav: "TopNavHangingLogo",
  topNavIsFixed: true,
  sideNav: "SideNavBasic",
  sideNavIsSticky: true,
  template: "CollectionBasic",
};

export const WithHero = Template.bind({});
WithHero.args = {
  ...Basic.args,
  topNav: "TopNavHangingLogo",
  sideNav: "SideNavBasic",
  hero: "HeroBasic",
};
