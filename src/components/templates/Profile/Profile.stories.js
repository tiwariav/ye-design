import LoremCard from "../../__stories/LoremCard.js";
import Container from "../../atoms/Container/Container.js";
import Image from "../../atoms/Image/Image.js";
import ProfileTemplate from "./index.js";

const metadata = {
  component: ProfileTemplate,
};

export default metadata;

const Template = ({ coverImage, ...args }) => {
  return (
    <ProfileTemplate
      contentLeft={
        <Container style={{ textAlign: "center" }}>
          <Image
            src={`${process.env.STORYBOOK_IMAGE_SRC}/160`}
            style={{ margin: "auto", width: 160 }}
          />
          <h1>Arvind Tiwari</h1>
          <p>
            Iure eos laborum ut sit laborum accusantium animi vel beatae. Est
            qui explicabo et
          </p>
        </Container>
      }
      coverImage={<Image src={coverImage} style={{ height: 200 }} />}
      {...args}
    >
      {Array.from({ length: 4 }).fill(<LoremCard />)}
    </ProfileTemplate>
  );
};

export const Profile = {
  args: {
    coverImage: `${process.env.STORYBOOK_IMAGE_SRC}/1600/400`,
  },
  render: (args) => <Template {...args} />,
};
