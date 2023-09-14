import LoremCard from "../../__stories/LoremCard.js";
import DetailsTemplate from "./index.js";

const metadata = {
  component: DetailsTemplate,
};

export default metadata;

const Template = ({ content, ...args }) => (
  <DetailsTemplate {...args}>
    {Array.from({ length: 4 }).fill(<LoremCard />)}
  </DetailsTemplate>
);

export const Details = {
  args: {
    contentSide: "Some Extra Content",
    hasSeparator: true,
    headerMain: "Title",
    headerSide: "Some Extra Header",
  },
  render: (args) => <Template {...args} />,
};
