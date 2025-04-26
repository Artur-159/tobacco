"use client";

import clsx from "clsx";
import { useController } from "react-hook-form";

import styles from "./styles.module.scss";

const Checkbox = ({
  label,
  disabled,
  name,
  className,
  onChange,
  checked,
  control,
  error,
}) => {
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <>
      <label className={clsx(styles.form_control, className)}>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={styles.checkbox}
          {...field}
        />
        {label}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default Checkbox;