import React from "react";
import { getStoryName } from "../../../utils/storybook";
import Image from "../../atoms/content/Image/Image";
import { Horizontal as CardHorizontal } from "../../atoms/sections/Card/Card.stories";
import Container from "../../atoms/sections/Container/Container";
import ProfileTemplate from "./Profile";

const metadata = {
  title: getStoryName(__dirname),
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
            src="https://picsum.photos/160"
            style={{ width: 160, margin: "auto" }}
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
  coverImage: "https://picsum.photos/1600/400",
};
