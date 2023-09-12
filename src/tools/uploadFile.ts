import { uniqueId } from "lodash-es";

export const UPLOAD_FILE_STATUS = {
  failed: "failed",
  new: "new",
  uploaded: "uploaded",
  uploading: "uploading",
} as const;

export type UploadFileData = {
  label: string;
  name: string;
  placeholder?: string;
  resource?: string;
  type: string;
  value: string;
};

export type UploadFileInitOptions = {
  data?: UploadFileData[];
  status?: keyof typeof UPLOAD_FILE_STATUS;
  type?: string;
};

export default class UploadFile {
  data?: UploadFileData[];
  file: File;
  id: string;
  progress?: [number, number];
  status: keyof typeof UPLOAD_FILE_STATUS;
  type?: string;

  constructor(file: File, { data, status, type }: UploadFileInitOptions = {}) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || "new";
    this.data = data;
    this.type = type;
  }
}
