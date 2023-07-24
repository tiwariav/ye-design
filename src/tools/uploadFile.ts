import { uniqueId } from "lodash-es";

export const UPLOAD_FILE_STATUS = [
  "failed",
  "new",
  "uploaded",
  "uploading",
] as const;

type UploadFileData = {
  label: string;
  name: string;
  placeholder?: string;
  resource?: string;
  type: string;
  value: string;
};

type UploadFileInitOptions = {
  data?: UploadFileData[];
  status?: (typeof UPLOAD_FILE_STATUS)[number];
};

export default class UploadFile {
  data?: UploadFileData[];
  file: File;
  id: string;
  progress?: [number, number];
  status: (typeof UPLOAD_FILE_STATUS)[number];

  constructor(file: File, { data, status }: UploadFileInitOptions) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || "new";
    this.data = data;
  }
}
