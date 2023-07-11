import { uniqueId } from "lodash-es";

export enum UPLOAD_FILE_STATUS {
  FAILED,
  NEW,
  UPLOADED,
  UPLOADING,
}

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

  status?: UPLOAD_FILE_STATUS;
};

export default class UploadFile {
  data: UploadFileData[];
  file: File;
  id: string;
  progress?: [number, number];
  status: UPLOAD_FILE_STATUS;

  constructor(file: File, { data, status }: UploadFileInitOptions) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || UPLOAD_FILE_STATUS.NEW;
    this.data = data;
  }
}
