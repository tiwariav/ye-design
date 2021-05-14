import React from "react";
import { AiOutlineLogin, AiOutlineSearch } from "react-icons/ai";
import { FaMicrophoneAlt } from "react-icons/fa";
import { GiWitchFlight } from "react-icons/gi";
import { IoLogoNodejs } from "react-icons/io";
import { getStoryName } from "../../../utils/storybook";
import { Button } from "../../atoms/forms/Button";
import TextInput from "../../atoms/forms/TextInput/TextInput";
import Topnav from "./Topnav";
import TopnavItem from "./TopnavItem";

const iconMap = { GiWitchFlight, IoLogoNodejs, FaMicrophoneAlt };
const itemsMap = {
  Button: (
    <TopnavItem>
      <Button size="small" label="Button" variant="outlined" />
    </TopnavItem>
  ),
  ButtonWithIcon: (
    <TopnavItem>
      <Button
        size="small"
        iconBefore={<AiOutlineLogin />}
        label="Button"
        variant="outlined"
      />
    </TopnavItem>
  ),
  ButtonWithSeparator: (
    <TopnavItem hasSeparator>
      <Button
        size="small"
        iconBefore={<FaMicrophoneAlt />}
        label="Button"
        variant="outlined"
      />
    </TopnavItem>
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
  title: getStoryName(__dirname),
  component: Topnav,
  argTypes: {
    logo: { control: { type: "select", options: Object.keys(iconMap) } },
    contentLeft: {
      control: { type: "inline-check", options: Object.keys(itemsMap) },
    },
    contentRight: {
      control: { type: "inline-check", options: Object.keys(itemsMap) },
    },
  },
};

export default metadata;

const Template = ({ logo, contentLeft, contentRight, ...args }) => {
  const Logo = iconMap[logo];
  return (
    <Topnav
      logo={Logo ? <Logo /> : null}
      contentLeft={contentLeft.map((item) => itemsMap[item])}
      contentRight={contentRight.map((item) => itemsMap[item])}
      {...args}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  logo: "GiWitchFlight",
  contentLeft: ["SearchInput"],
  contentRight: ["ButtonWithSeparator", "Button"],
};

export const Transparent = Template.bind({});
Transparent.args = {
  ...Basic.args,
  variant: "transparent",
};

export const Expanded = Template.bind({});
Expanded.argTypes = {
  isShrinking: { control: { type: "range", min: 0, max: 72, step: 1 } },
};
Expanded.args = {
  ...Basic.args,
  isExpanded: true,
  isShrinking: 0,
};

export const HangingLogo = Template.bind({});
HangingLogo.argTypes = {
  isShrinking: { control: { type: "range", min: 0, max: 72, step: 1 } },
};
HangingLogo.args = {
  ...Basic.args,
  logoVariant: "hanging",
};
