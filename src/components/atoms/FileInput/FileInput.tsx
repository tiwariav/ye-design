/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined'] }] */

import { IconReload, IconTrashXFilled } from "@tabler/icons-react";
import { clsx } from "clsx";
import { debounce, omit, uniqueId } from "lodash-es";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
  useMemo,
  useState,
} from "react";

import { EXCLUDE_HANDLERS } from "../../../tools/input.js";
import UploadFile from "../../../tools/uploadFile.js";
import Button from "../Button/Button.js";
import CircleProgress from "../CircleProgress/CircleProgress.js";
import Spinner from "../Spinner/Spinner.js";
import TextInput from "../TextInput/TextInput.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import styles from "./fileInput.module.css";

const FILE_INPUT_VARIANT_OPTIONS = ["outlined"] as const;
const FILE_INPUT_SIZE_OPTIONS = ["small", "large"] as const;
const FILE_INPUT_SPACING_OPTIONS = ["none", "less", "equal", "extra"] as const;

export interface FileInputProps<TFile extends UploadFile = UploadFile>
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  files: TFile[];
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  innerClassNames?: {
    input?: string;
    label?: string;
    listItemDataInput?: string;
    placeholder?: string;
  };
  isBusy?: boolean;
  label?: ReactNode;
  placeholder?: string;
  size?: (typeof FILE_INPUT_SIZE_OPTIONS)[number];
  spacing?: (typeof FILE_INPUT_SPACING_OPTIONS)[number];
  updateFiles?: (
    files: (File | TFile)[],
    action: "add" | "remove" | "update",
  ) => Promise<void> | void;
  variant?: (typeof FILE_INPUT_VARIANT_OPTIONS)[number];
}

export default function FileInput<TFile extends UploadFile = UploadFile>({
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
  size,
  spacing,
  updateFiles,
  variant,
  ...props
}: FileInputProps<TFile>) {
  const [hasFocus, setHasFocus] = useState(false);
  const fileInputID = useMemo(() => id || uniqueId("fileInput_"), [id]);

  const handleFocus: typeof onFocus = (event) => {
    setHasFocus(true);
    onFocus?.(event);
  };

  const handleBlur: typeof onBlur = (event) => {
    setHasFocus(false);
    onBlur?.(event);
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 && updateFiles) {
      await updateFiles([...event.target.files], "add");
    }
    onChange?.(event);
  };

  const handleDataChange = debounce(
    async (
      event: ChangeEvent<HTMLInputElement>,
      file: TFile,
      dataIndex: number,
    ) => {
      const fileData = file.data ? [...file.data] : [];
      fileData[dataIndex].value = event.target.value;
      await updateFiles?.([{ ...file, data: fileData }], "update");
    },
    500,
  );

  return (
    <div className={clsx(className)}>
      <label
        className={clsx(
          size && formStyles[`is-${size}`],
          styles.wrapper,
          variant && styles[`is-${variant}`],
          {
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
          onChange={(event) => void handleChange(event)}
          onFocus={handleFocus}
          type="file"
          {...omit(props, EXCLUDE_HANDLERS)}
        />
        <span className={clsx(styles.placeholder, innerClassNames.input)}>
          {placeholder}
        </span>
        {iconAfter && (
          <span className={clsx(styles.iconWrapper, styles.iconRight)}>
            <span className={clsx(formStyles.icon)}>{iconAfter}</span>
          </span>
        )}
        {isBusy && <Spinner className={styles.spinner} />}
      </label>
      {files && files.length > 0 && (
        <div>
          {files.map((item, index) => (
            <div key={index}>
              <div className={styles.listItem} key={index}>
                <div className={styles.listItemText}>{item.file.name}</div>
                {item.status === "uploading" ? (
                  <>
                    <div
                      className={clsx(
                        styles.listItemStatusText,
                        styles.progress,
                      )}
                    >
                      Uploading...
                    </div>
                    {item.progress && (
                      <div>
                        <CircleProgress
                          className={styles.listItemProgress}
                          progress={item.progress}
                          squareSize={18}
                        />
                      </div>
                    )}
                  </>
                ) : item.status === "uploaded" ? (
                  <div className={styles.uploadSection}>
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
                        onClick={() => void updateFiles?.([item], "remove")}
                        spacing="equal"
                        variant="trans"
                      >
                        <IconTrashXFilled />
                      </Button>
                    </div>
                  </div>
                ) : (
                  item.status === "failed" && (
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
                          onClick={() => void updateFiles?.([item], "add")}
                          spacing="equal"
                          variant="trans"
                        >
                          <IconReload />
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => void updateFiles?.([item], "remove")}
                          spacing="equal"
                          variant="trans"
                        >
                          <IconTrashXFilled />
                        </Button>
                      </div>
                    </>
                  )
                )}
              </div>
              {item.data &&
                item.data.length > 0 &&
                item.data.map((dataItem, dataIndex) =>
                  dataItem.type === "password" ? (
                    <TextInput
                      onChange={(event) =>
                        void handleDataChange(event, item, dataIndex)
                      }
                      defaultValue={dataItem.value}
                      innerClassNames={{ input: styles.listItemDataInput }}
                      key={index}
                      label={dataItem.label}
                      placeholder={dataItem.placeholder}
                      size="small"
                      type={dataItem.type || "text"}
                    />
                  ) : (
                    dataItem.type === "preview" && (
                      <img
                        alt={dataItem.name}
                        className={styles.previewImage}
                        id={dataItem.resource}
                        src={dataItem.resource}
                      />
                    )
                  ),
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
