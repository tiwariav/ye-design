import { uniqueId } from "lodash-es";

export const UPLOAD_FILE_STATUS = {
  new: "new",
  uploading: "uploading",
  uploaded: "uploaded",
  failed: "failed",
};

export default class UploadFile {
  constructor(file, { status } = {}) {
    this.file = file;
    this.id = uniqueId("upload_file_");
    this.status = status || UPLOAD_FILE_STATUS.new;
  }
}
