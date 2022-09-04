import { uniqueId } from "lodash-es";

export const UPLOAD_FILE_STATUS = {
  failed: "failed",
  new: "new",
  uploaded: "uploaded",
  uploading: "uploading",
};

export default class UploadFile {
  constructor(file, { status, data } = {}) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || UPLOAD_FILE_STATUS.new;
    this.data = data;
  }
}
