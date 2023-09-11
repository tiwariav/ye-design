import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import UploadFile from "../../../tools/uploadFile.js";
import FileInput, { FileInputProps } from "./FileInput.js";

function Template({ files, ...args }: FileInputProps) {
  const [allFiles, setFiles] = useState(files);
  return (
    <FileInput
      files={allFiles}
      updateFiles={(files) =>
        setFiles(
          files.map((item) =>
            item instanceof UploadFile ? item : new UploadFile(item),
          ),
        )
      }
      {...args}
    />
  );
}

const metadata: Meta<FileInputProps> = {
  argTypes: {
    onChange: { action: "onChange" },
  },
  component: FileInput,
  render: (args) => <Template {...args} />,
};

export default metadata;

type Story = StoryObj<typeof FileInput>;

export const Basic: Story = {};

class CustomUploadFile extends UploadFile {
  text?: string;
}

function FileObjectTemplate({ files = [], ...args }: FileInputProps) {
  const [allFiles, setFiles] = useState<CustomUploadFile[]>(files);
  return (
    <>
      <FileInput
        files={allFiles}
        updateFiles={(files) =>
          setFiles(
            files.map((item) => {
              if (item instanceof CustomUploadFile) {
                return item;
              }
              const customFile = new CustomUploadFile(item);
              customFile.text = `custom text from file ${customFile.file.name}`;
              return customFile;
            }),
          )
        }
        {...args}
      />
      <div>{allFiles.map((file) => file.text || "")}</div>
    </>
  );
}

export const CustomFileObject: Story = {
  render: (args) => FileObjectTemplate(args),
};
