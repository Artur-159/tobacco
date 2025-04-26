import clsx from "clsx";
import { useController } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import styles from "./styles.module.scss";

const Textarea = ({
  className,
  type,
  placeholder,
  name,
  control,
  onChange,
  multiline,
  defaultValue,
  rows,
  cols,
  error,
}) => {
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <>
      <TextareaAutosize
        cols={cols}
        type={type}
        error={error}
        minRows={rows}
        maxRows={13}
        onChange={onChange}
        multiline={multiline}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={clsx(
          className,
          styles.textarea,
          error && styles.textarea_error
        )}
        {...field}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </>
  );
};

export default Textarea;
