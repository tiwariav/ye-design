import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { LoremCard } from "../../__stories/CardTemplates.js";
import Container from "../../atoms/Container/Container.js";
import Image from "../../atoms/Image/Image.js";
import Profile from "./index.js";

type TemplateProps = ComponentProps<typeof Profile> & { coverImage?: string };

export const Template = ({
  coverImage = `${process.env.STORYBOOK_IMAGE_SRC}/1600/400`,
  ...args
}: TemplateProps) => {
  return (
    <Profile
      contentLeft={
        <Container style={{ textAlign: "center" }}>
          {process.env.STORYBOOK_IMAGE_SRC && (
            <Image
              src={`${process.env.STORYBOOK_IMAGE_SRC}/160`}
              style={{ margin: "auto", width: 160 }}
            />
          )}

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
      {Array.from({ length: 4 }, () => (
        <LoremCard />
      ))}
    </Profile>
  );
};

const metadata: Meta<TemplateProps> = {
  component: Profile,
  render: (args) => <Template {...args} />,
};

export default metadata;

type Story = StoryObj<TemplateProps>;

export const Basic: Story = {
  args: {
    coverImage: `${process.env.STORYBOOK_IMAGE_SRC}/1600/400`,
  },
};
