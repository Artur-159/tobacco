import { useState } from "react";
import { useController } from "react-hook-form";
import clsx from "clsx";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styles from "./styles.module.scss";

const TextInput = ({
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
  size,
  onKeyUp = () => {},
  variant = "outlined",
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword((prev) => !prev);
  };
  const getValue = () => {
    if (typeof field.value === "object" && field.value !== null) {
      return "";
    }
    return field.value || "";
  };

  return (
    <div>
      <TextField
        rows={rows}
        cols={cols}
        size={size}
        error={!!error}
        variant={variant}
        multiline={multiline}
        defaultValue={defaultValue}
        label={placeholder}
        type={type === "password" && showPassword ? "text" : type}
        onChange={onChange}
        onKeyUp={onKeyUp}
        {...field}
        value={getValue()}
        className={clsx(className, styles.main_input)}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={handleShow}>
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default TextInput;
