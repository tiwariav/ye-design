import ContainerComponent from "./Container.js";

const metadata = {
  component: ContainerComponent,
};

export default metadata;

const Template = ({ content, ...args }) => (
  <ContainerComponent
    style={{ border: "1px solid var(--ye-color-black-10)" }}
    {...args}
  />
);

export const Container = {
  args: {
    children: "This is a container. It provides space around content.",
  },
  render: (args) => <Template {...args} />,
};
