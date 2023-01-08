import { Basic as HeroBasic } from "../../atoms/Hero/Hero.stories.js";
import {
  Basic as CollectionBasic,
  FixedColumns as CollectionFixedColumns,
  Grid as CollectionGrid,
} from "../../templates/Collection/Collection.stories.js";
import { Details } from "../../templates/Details/Details.stories.js";
import { Profile } from "../../templates/Profile/Profile.stories.js";
import { Basic as SideNavBasic } from "../SideNav/SideNav.stories.js";
import {
  Basic as TopNavBasic,
  HangingLogo as TopNavHangingLogo,
} from "../TopNav/TopNav.stories.js";
import Page from "./Page.js";

const topNavMap = {
  TopNavBasic: <TopNavBasic {...TopNavBasic.args} />,
  TopNavHangingLogo: <TopNavHangingLogo {...TopNavHangingLogo.args} />,
};
const sideNavMap = {
  SideNavBasic: <SideNavBasic {...SideNavBasic.args} withHanging />,
};
const heroMap = { HeroBasic: <HeroBasic {...HeroBasic.args} /> };
const templateMap = {
  CollectionBasic,
  CollectionFixedColumns,
  CollectionGrid,
  Details,
  Profile,
};

const metadata = {
  argTypes: {
    hero: { control: { options: Object.keys(heroMap), type: "select" } },

    sideNav: { control: { options: Object.keys(sideNavMap), type: "select" } },

    template: {
      control: { options: Object.keys(templateMap), type: "select" },
    },
    // creates a specific argType based on the iconMap object
    topNav: { control: { options: Object.keys(topNavMap), type: "select" } },
  },
  component: Page,
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
  sideNav: "SideNavBasic",
  sideNavIsSticky: true,
  template: "CollectionBasic",
  topNav: "TopNavHangingLogo",
  topNavIsFixed: true,
};

export const WithHero = Template.bind({});
WithHero.args = {
  ...Basic.args,
  hero: "HeroBasic",
  sideNav: "SideNavBasic",
  topNav: "TopNavHangingLogo",
};
