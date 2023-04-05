import Hero from "./Hero.js";

const metadata = {
  component: Hero,
};

export default metadata;

const Template = (args) => <Hero {...args} />;

export const Basic = {
  args: {
    midContent: <p>Hero content</p>,
    title: "Hero Title",
  },
  render: (args) => <Template {...args} />,
};
