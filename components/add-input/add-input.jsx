import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../text-input/text-input";
import MainButton from "../button/button";
import { Add, Delete } from "@mui/icons-material";

import styles from "./styles.module.scss";

const AddInput = ({ control, name, type, placeholder, className }) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  useEffect(() => {
    if (fields.length === 0) append({ value: null });
  }, [fields, append]);

  return (
    <div className={styles.container}>
      <div className={className}>
        {fields.map((field, index) => (
          <div className={styles.add_input} key={field.id || index}>
            <TextInput
              type={type}
              size="small"
              control={control}
              placeholder={placeholder}
              name={`${name}[${index}]`}
              className={styles.add_inp_box}
            />
            <MainButton
              className={styles.delete_button}
              onClick={() => remove(index)}
            >
              <Delete className={styles.delete_icon} />
            </MainButton>
          </div>
        ))}
      </div>
      <MainButton
        className={styles.add_button}
        onClick={() => append({ value: "" })}
      >
        <Add />
      </MainButton>
    </div>
  );
};

export default AddInput;
