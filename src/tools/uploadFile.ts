import { uniqueId } from "lodash-es";

export const UPLOAD_FILE_STATUS = {
  failed: "failed",
  new: "new",
  uploaded: "uploaded",
  uploading: "uploading",
};

export default class UploadFile {
  file: any;
  id: any;
  status: any;
  data: any;

  constructor(file, { status, data }: any = {}) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || UPLOAD_FILE_STATUS.new;
    this.data = data;
  }
}
