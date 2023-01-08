import { Horizontal as CardHorizontal } from "../../atoms/Card/Card.stories.js";
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
      coverImage={<Image src={coverImage} style={{ height: 200 }} />}
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
      {...args}
    >
      {Array.from({ length: 4 }).fill(
        <CardHorizontal {...CardHorizontal.args}>
          Expedita possimus dolor est unde possimus. Velit est qui alias
          veritatis a reprehenderit. Eos minus velit dolorem dolorem voluptatem
          molestiae odio et dolor.
        </CardHorizontal>
      )}
    </ProfileTemplate>
  );
};

export const Profile = Template.bind({});
Profile.args = {
  coverImage: `${process.env.STORYBOOK_IMAGE_SRC}/1600/400`,
};
