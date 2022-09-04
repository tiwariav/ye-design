import Hero from "./Hero";

const metadata = {
  component: Hero,
};

export default metadata;

const Template = (args) => <Hero {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  midContent: <p>Hero content</p>,
  title: "Hero Title",
};
