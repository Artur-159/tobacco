import { useState } from "react";
import ReactQuill from "react-quill";
import { useController } from "react-hook-form";
import clsx from "clsx";

import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.scss";

const TextEditor = ({ name, control, placeholder, className, error }) => {
  const [value, setValue] = useState("");
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <div>
      <div className={clsx(styles.editor_text_box, className)}>
        <ReactQuill
          name={name}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          className={styles.editor_text}
          {...field}
        />
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};
export default TextEditor;
