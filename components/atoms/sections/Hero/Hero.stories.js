import Hero from "./Hero";

const metadata = {
  component: Hero,
};

export default metadata;

const Template = (args) => <Hero {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: "Hero Title",
  midContent: <p>Hero content</p>,
};
