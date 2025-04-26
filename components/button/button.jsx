import clsx from "clsx";
import Button from "@mui/material/Button";

import styles from "./styles.module.scss";

const MainButton = ({
  children,
  className,
  onClick,
  color,
  autoFocus,
  variant,
  startIcon,
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      color={color}
      disabled={disabled}
      autoFocus={autoFocus}
      className={clsx(className, styles.button)}
      sx={{ textTransform: "none" }}
    >
      {children}
    </Button>
  );
};
export default MainButton;
