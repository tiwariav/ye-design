import { Meta } from "@storybook/react";
import { ComponentProps } from "react";

import Hero from "../../atoms/Hero/Hero.js";
import { Basic as HeroBasic } from "../../atoms/Hero/Hero.stories.js";
import {
  Basic as CollectionBasic,
  FixedColumns as CollectionFixedColumns,
  Grid as CollectionGrid,
  Template as CollectionTemplate,
} from "../../templates/Collection/Collection.stories.js";
import {
  Basic as DetailsBasic,
  Template as DetailsTemplate,
} from "../../templates/Details/Details.stories.js";
import {
  Basic as ProfileBasic,
  Template as ProfileTemplate,
} from "../../templates/Profile/Profile.stories.js";
import {
  Basic as SideNavBasic,
  Template as SideNavTemplate,
} from "../SideNav/SideNav.stories.js";
import {
  Basic as TopNavBasic,
  HangingLogo as TopNavHangingLogo,
} from "../TopNav/TopNav.stories.js";
import { TopNav } from "../index.js";
import Page from "./Page.js";

const topNavMap = {
  ImageBasic: <TopNav {...TopNavBasic.args} />,
  TopNavHangingLogo: <TopNav {...TopNavHangingLogo.args} />,
};

const sideNavMap = {
  SideNavBasic: <SideNavTemplate {...SideNavBasic.args} />,
};
const heroMap = { HeroBasic: <Hero {...HeroBasic.args} /> };
const templateMap = {
  CollectionBasic: <CollectionTemplate {...CollectionBasic.args} />,
  CollectionFixedColumns: (
    <CollectionTemplate {...CollectionFixedColumns.args} />
  ),
  CollectionGrid: <CollectionTemplate {...CollectionGrid.args} />,
  Details: <DetailsTemplate {...DetailsBasic.args} />,
  Profile: <ProfileTemplate {...ProfileBasic.args} />,
};

const Template = ({
  hero,
  sideNav,
  topNav,
  ...args
}: ComponentProps<typeof Page>) => {
  return (
    <Page hero={hero} sideNav={sideNav} topNav={topNav} {...args}>
      <CollectionTemplate {...CollectionBasic.args} />
    </Page>
  );
};

const metadata: Meta<typeof Page> = {
  argTypes: {
    children: { mapping: templateMap, options: Object.keys(templateMap) },
    hero: { mapping: heroMap, options: Object.keys(heroMap) },
    sideNav: { mapping: sideNavMap, options: Object.keys(sideNavMap) },
    topNav: { mapping: topNavMap, options: Object.keys(topNavMap) },
  },
  component: Page,
  decorators: [
    (Story) => (
      <div style={{ margin: "-1rem" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <Template {...args} />,
};

export default metadata;

export const Basic = {
  args: {
    sideNav: "SideNavBasic",
    sideNavIsSticky: true,
    template: "CollectionBasic",
    topNav: "TopNavHangingLogo",
    topNavIsFixed: true,
  },
};

export const WithHero = {
  args: {
    ...Basic.args,
    hero: "HeroBasic",
    sideNav: "SideNavBasic",
    topNav: "TopNavHangingLogo",
  },
};
