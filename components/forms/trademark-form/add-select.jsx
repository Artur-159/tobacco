import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MainSelect from "../../main-select/main-select";
import TextInput from "../../text-input/text-input";
import MainButton from "../../button/button";
import { Delete, Add } from "@mui/icons-material";
import { TradeMarkAPI } from "../../../services/trademark";
import { SelectOption } from "../../../utils/select-options";

import styles from "../../../pages/trademark/styles.module.scss";

const AddSelect = ({ control, name }) => {
  const dispatch = useDispatch();

  const { niceClasses } = useSelector((state) => state.tradeMark);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const niceClassesOptions = useMemo(
    () => SelectOption(niceClasses),
    [niceClasses]
  );

  useEffect(() => {
    dispatch(TradeMarkAPI.getNiceClasses());
  }, [dispatch]);

  return (
    <div className={styles.add_file_block}>
      <Link to="/files/trademark-info.pdf" target="_blank">
        Ապրանքներ և ծառայություններ, Նիցայի դասակարգիչ
      </Link>
      <div className={styles.add_file_info}>
        <MainSelect
          control={control}
          name={`${name}.0.class_id`}
          options={niceClassesOptions}
          className={styles.first_select}
          placeholder="Նիցայի դասակարգիչ"
        />
        <TextInput
          control={control}
          name={`${name}.0.value`}
          multiline
          placeholder="Ապրանքներ և ծառայություններ"
          size="small"
          className={styles.doc_name_inp}
        />

        <MainButton
          variant="text"
          className={styles.add_file_btn}
          startIcon={<AddIcon />}
          onClick={() =>
            append({
              class_id: "",
              value: "",
            })
          }
        ></MainButton>
      </div>

      {fields.slice(1).map((field, index) => (
        <div key={field.id} className={styles.add_file_info}>
          <MainSelect
            control={control}
            name={`${name}.${index + 1}.class_id`}
            options={niceClassesOptions}
            className={styles.add_file_select}
            placeholder="Նիցայի դասակարգիչ"
          />
          <TextInput
            control={control}
            name={`${name}.${index + 1}.value`}
            multiline
            placeholder="Ապրանքներ և ծառայություններ"
            size="small"
            className={styles.doc_name_inp}
          />

          <MainButton
            variant="text"
            className={styles.add_btn}
            startIcon={<Add className={styles.btn_icon} />}
            onClick={() =>
              append({
                class_id: "",
                value: "",
              })
            }
          ></MainButton>

          <MainButton
            variant="text"
            color="error"
            onClick={() => remove(index)}
          >
            <Delete className={styles.delete_icon} />
          </MainButton>
        </div>
      ))}
    </div>
  );
};

export default AddSelect;
