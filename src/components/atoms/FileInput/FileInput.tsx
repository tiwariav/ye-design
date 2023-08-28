/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined'] }] */

import { IconReload, IconTrashXFilled } from "@tabler/icons-react";
import { clsx } from "clsx";
import { debounce, uniqueId } from "lodash-es";
import { useMemo, useState } from "react";

import { UPLOAD_FILE_STATUS } from "../../../tools/uploadFile.js";
import { Button } from "../Button/index.js";
import CircleProgress from "../CircleProgress/CircleProgress.js";
import Spinner from "../Spinner/Spinner.js";
import TextInput from "../TextInput/TextInput.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import styles from "./fileInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function FileInput({
  className,
  files,
  iconAfter,
  iconBefore,
  id,
  innerClassNames = {},
  isBusy,
  label,
  onBlur,
  onChange,
  onFocus,
  placeholder = "Browse",
  size = "medium",
  spacing,
  updateFiles,
  uploadFiles,
  variant,
  ...props
}: any) {
  const [hasFocus, setHasFocus] = useState(false);
  const fileInputID = useMemo(() => id || uniqueId("fileInput_"), [id]);

  const handleFocus = (event) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleBlur = (event) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      updateFiles([...event.target.files], "add");
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleDataChange = debounce((event, file, dataIndex) => {
    const fileData = [...file.data];
    fileData[dataIndex].value = event.target.value;
    updateFiles([{ ...file, data: fileData }], "update");
  }, 500);

  return (
    <div className={clsx(className)}>
      <label
        className={clsx(
          formStyles[`is-${size}`],
          styles.wrapper,
          styles[`is-${variant}`],
          {
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasFocus]: hasFocus,
          },
        )}
      >
        {label && <span className={styles.label}>{label}</span>}
        {iconBefore && (
          <span className={clsx(styles.iconWrapper)}>
            <span className={clsx(formStyles.icon)}>{iconBefore}</span>
          </span>
        )}
        <input
          className={clsx(styles.input)}
          id={fileInputID}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          type="file"
          {...props}
        />
        <span className={clsx(styles.placeholder, innerClassNames.input)}>
          {placeholder}
        </span>
        {iconAfter ? (
          <span className={clsx(styles.iconWrapper, styles.iconRight)}>
            <span className={clsx(formStyles.icon)}>{iconAfter}</span>
          </span>
        ) : null}
        {isBusy ? <Spinner className={styles.spinner} /> : null}
      </label>
      {files && files.length > 0 && (
        <div>
          {files.map((item, index) => (
            <div key={index}>
              <div className={styles.listItem} key={index}>
                <div className={styles.listItemText}>{item.file.name}</div>
                <div className={styles.uploadSection}>
                  {item.status === UPLOAD_FILE_STATUS.uploading ? (
                    <>
                      <div
                        className={clsx(
                          styles.listItemStatusText,
                          styles.progress,
                        )}
                      >
                        Uploading...
                      </div>
                      <div>
                        <CircleProgress
                          className={styles.listItemProgress}
                          progress={item.progress}
                          squareSize={18}
                        />
                      </div>
                    </>
                  ) : item.status === UPLOAD_FILE_STATUS.uploaded ? (
                    <>
                      <div
                        className={clsx(
                          styles.listItemStatusText,
                          styles.success,
                        )}
                      >
                        Uploaded
                      </div>
                      <div>
                        <Button
                          onClick={() => updateFiles([item], "remove")}
                          spacing="equal"
                          variant="trans"
                        >
                          <IconTrashXFilled />
                        </Button>
                      </div>
                    </>
                  ) : item.status === UPLOAD_FILE_STATUS.failed ? (
                    <>
                      <div
                        className={clsx(
                          styles.listItemStatusText,
                          styles.failed,
                        )}
                      >
                        Failed
                      </div>
                      <div>
                        <Button
                          onClick={() => uploadFiles([item])}
                          spacing="equal"
                          variant="trans"
                        >
                          <IconReload />
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => updateFiles([item], "remove")}
                          spacing="equal"
                          variant="trans"
                        >
                          <IconTrashXFilled />
                        </Button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              {item.data &&
                item.data.length > 0 &&
                item.data.map((dataItem, dataIndex) =>
                  dataItem.type === "password" ? (
                    <TextInput
                      onChange={(event) =>
                        handleDataChange(event, item, dataIndex)
                      }
                      defaultValue={dataItem.value}
                      innerClassNames={{ input: styles.listItemDataInput }}
                      key={index}
                      label={dataItem.label}
                      placeholder={dataItem.placeholder}
                      size="small"
                      type={dataItem.type || "text"}
                    />
                  ) : dataItem.type === "preview" ? (
                    <img
                      alt={dataItem.name}
                      className={styles.previewImage}
                      id={dataItem.resource}
                      src={dataItem.resource}
                    />
                  ) : null,
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
