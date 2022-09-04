import { AiOutlineLogin, AiOutlineSearch } from "react-icons/ai";
import { FaMicrophoneAlt } from "react-icons/fa";
import { GiWitchFlight } from "react-icons/gi";
import { IoLogoNodejs } from "react-icons/io";
import { Button, TextInput } from "../../atoms/forms";
import TopNav from "./TopNav";
import TopNavItem from "./TopNavItem";

const iconMap = { FaMicrophoneAlt, GiWitchFlight, IoLogoNodejs };
const itemsMap = {
  Button: (
    <TopNavItem>
      <Button size="small" label="Button" variant="outlined" />
    </TopNavItem>
  ),
  ButtonWithIcon: (
    <TopNavItem>
      <Button
        size="small"
        iconBefore={<AiOutlineLogin />}
        label="Button"
        variant="outlined"
      />
    </TopNavItem>
  ),
  ButtonWithSeparator: (
    <TopNavItem hasSeparator>
      <Button
        size="small"
        iconBefore={<FaMicrophoneAlt />}
        label="Button"
        variant="outlined"
      />
    </TopNavItem>
  ),
  SearchInput: (
    <TextInput
      iconBefore={<AiOutlineSearch />}
      variant="borderless"
      placeholder="Search Here"
    />
  ),
};

const metadata = {
  argTypes: {
    contentLeft: {
      control: { options: Object.keys(itemsMap), type: "inline-check" },
    },
    contentRight: {
      control: { options: Object.keys(itemsMap), type: "inline-check" },
    },
    logo: { control: { options: Object.keys(iconMap), type: "select" } },
  },
  component: TopNav,
};

export default metadata;

const Template = ({ logo, contentLeft, contentRight, ...args }) => {
  const Logo = iconMap[logo];
  return (
    <TopNav
      logo={Logo ? <Logo /> : null}
      contentLeft={contentLeft.map((item) => itemsMap[item])}
      contentRight={contentRight.map((item) => itemsMap[item])}
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  contentLeft: ["SearchInput"],
  contentRight: ["ButtonWithSeparator", "Button"],
  logo: "GiWitchFlight",
};

export const Transparent = Template.bind({});
Transparent.args = {
  ...Basic.args,
  variant: "transparent",
};

export const Expanded = Template.bind({});
Expanded.argTypes = {
  isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
};
Expanded.args = {
  ...Basic.args,
  isExpanded: true,
  isShrinking: 0,
};

export const HangingLogo = Template.bind({});
HangingLogo.argTypes = {
  isShrinking: { control: { max: 72, min: 0, step: 1, type: "range" } },
};
HangingLogo.args = {
  ...Basic.args,
  logoVariant: "hanging",
};
