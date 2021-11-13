/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined'] }] */

import clsx from "clsx";
import { debounce, uniqueId } from "lodash-es";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { AiFillDelete, AiOutlineReload } from "react-icons/ai";
import { UPLOAD_FILE_STATUS } from "../../../../lib/uploadFile";
import Spinner from "../../content/Spinner/Spinner";
import CircleProgress from "../../progress/CircleProgress/CircleProgress";
import { Button } from "../Button";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import TextInput from "../TextInput/TextInput";
import styles from "./fileInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function FileInput({
  size = "medium",
  iconBefore,
  iconAfter,
  label,
  variant,
  onFocus,
  onBlur,
  isBusy,
  spacing,
  className,
  inputClassName,
  files,
  updateFiles,
  uploadFiles,
  placeholder = "Browse",
  ...props
}) {
  const [hasFocus, setHasFocus] = useState(false);
  const idRef = useRef(uniqueId("input_"));

  const handleFocus = (e) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  const handleBlur = (e) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      updateFiles([...event.target.files], "add");
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
          }
        )}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        {iconBefore ? (
          <span className={clsx(styles.iconWrapper)}>
            <span className={clsx(formStyles.icon)}>{iconBefore}</span>
          </span>
        ) : null}
        <input
          id={idRef}
          type="file"
          className={clsx(styles.input)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <span className={clsx(styles.placeholder, inputClassName)}>
          {placeholder}
        </span>
        {iconAfter ? (
          <span className={clsx(styles.iconWrapper, styles.iconRight)}>
            <span className={clsx(formStyles.icon)}>{iconAfter}</span>
          </span>
        ) : null}
        {isBusy ? <Spinner className={styles.spinner} /> : null}
      </label>
      {files && files.length > 0 ? (
        <div>
          {files.map((item, index) => (
            <div key={index}>
              <div className={styles.listItem} key={index}>
                <div className={styles.listItemText}>{item.file.name}</div>
                {item.status === UPLOAD_FILE_STATUS.uploading ? (
                  <>
                    <div
                      className={clsx(
                        styles.listItemStatusText,
                        styles.progress
                      )}
                    >
                      Uploading...
                    </div>
                    <div>
                      <CircleProgress
                        squareSize={18}
                        progress={item.progress}
                        className={styles.listItemProgress}
                      />
                    </div>
                  </>
                ) : item.status === UPLOAD_FILE_STATUS.uploaded ? (
                  <>
                    <div
                      className={clsx(
                        styles.listItemStatusText,
                        styles.success
                      )}
                    >
                      Uploaded
                    </div>
                    <div>
                      <Button
                        onClick={() => updateFiles([item], "remove")}
                        variant="trans"
                        spacing="equal"
                      >
                        <AiFillDelete />
                      </Button>
                    </div>
                  </>
                ) : item.status === UPLOAD_FILE_STATUS.failed ? (
                  <>
                    <div
                      className={clsx(styles.listItemStatusText, styles.failed)}
                    >
                      Failed
                    </div>
                    <div>
                      <Button
                        onClick={() => uploadFiles([item])}
                        variant="trans"
                        spacing="equal"
                      >
                        <AiOutlineReload />
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => updateFiles([item], "remove")}
                        variant="trans"
                        spacing="equal"
                      >
                        <AiFillDelete />
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>
              {item.data && item.data.length > 0
                ? item.data.map((dataItem, dataIndex) => (
                    <TextInput
                      inputClassName={styles.listItemDataInput}
                      key={index}
                      size="small"
                      onChange={(event) =>
                        handleDataChange(event, item, dataIndex)
                      }
                      defaultValue={dataItem.value}
                      placeholder={dataItem.placeholder}
                      type={dataItem.type || "text"}
                    />
                  ))
                : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

FileInput.propTypes = {
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Icon element
   */
  iconBefore: PropTypes.element,
  /**
   * Icon element
   */
  iconAfter: PropTypes.element,
  /**
   * Label text
   */
  label: PropTypes.string,
  /**
   * Label text
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Wether the element is busy
   */
  isBusy: PropTypes.bool,
};
