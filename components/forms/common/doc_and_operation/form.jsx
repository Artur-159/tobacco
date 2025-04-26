import MainButton from "../../../button/button";
import TextInput from "../../../text-input/text-input";
import { Add } from "@mui/icons-material";

import styles from "../../../../pages/doc-type/styles.module.scss";

const Form = ({ name, control, placeholder, errors, onSubmit }) => {
  return (
    <div className={styles.form}>
      <TextInput
        type="text"
        name={name}
        control={control}
        placeholder={placeholder}
        error={errors[name]?.message}
      />
      <MainButton
        type="submit"
        onClick={onSubmit}
        variant="contained"
        startIcon={<Add />}
      >
        Ստեղծել
      </MainButton>
    </div>
  );
};

export default Form;
