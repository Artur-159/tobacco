import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainButton from "../button/button";

import styles from "./styles.module.scss";

const Back = ({ variant = "outlined" }) => {
  const navigate = useNavigate();

  return (
    <MainButton
      variant={variant}
      className={styles.btn}
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
    />
  );
};

export default Back;
