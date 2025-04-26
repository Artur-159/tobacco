import { useFieldArray } from "react-hook-form";
import MainSelect from "../../main-select/main-select";
import TextInput from "../../text-input/text-input";
import UploadFile from "../../uploads/file/file";
import MainButton from "../../button/button";
import { Delete, Add } from "@mui/icons-material";
import { FILE_TYPE_OPTIONS } from "../../../constant/partner";

import styles from "../../../pages/partner/styles.module.scss";

const FileInputRow = ({ control, name, url }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <div className={styles.add_file_info}>
        <TextInput
          control={control}
          name={`${name}.0.name`}
          placeholder="Փաստաթղթի անուն"
          size="small"
        />
        <MainSelect
          control={control}
          name={`${name}.0.file_select_type`}
          options={FILE_TYPE_OPTIONS}
          className={styles.add_file_select}
          placeholder="Տեսակ"
        />
        <div className={styles.radioBtnBlock}>
          <div>
            <h5>Տրման թիվ</h5>
            <TextInput
              control={control}
              name={`${name}.0.issue_number`}
              type="date"
              size="small"
            />
          </div>
        </div>
        <div className={styles.deadline}>
          <h5>Վերջնաժամկետ</h5>
          <TextInput
            control={control}
            name={`${name}.0.deadline`}
            type="date"
            size="small"
          />
        </div>
        <div className={styles.container}>
          <UploadFile
            control={control}
            name={`${name}.0.file`}
            url={url}
            index={0}
            placeholder="File Type"
            className={styles.add_file}
          />
          <MainButton
            type="button"
            startIcon={<Add className={styles.btn_icon} />}
            onClick={() =>
              append({
                name: "",
                file_select_type: "",
                issue_number: "",
                deadline: "",
                file: "",
              })
            }
          />
        </div>
      </div>

      {fields.slice(1).map((field, index) => (
        <div key={field.id} className={styles.add_file_info}>
          <TextInput
            control={control}
            name={`${name}.${index + 1}.name`}
            size="small"
            placeholder="Փաստաթղթի անուն"
          />
          <MainSelect
            control={control}
            name={`${name}.${index + 1}.file_select_type`}
            options={FILE_TYPE_OPTIONS}
            className={styles.add_file_select}
            placeholder="Տեսակ"
          />

          <div className={styles.add_new_files}>
            <h4>Տրման թիվ</h4>
            <TextInput
              control={control}
              name={`${name}.${index + 1}.issue_number`}
              type="date"
              size="small"
            />
          </div>
          <div className={styles.btn_block}>
            <MainButton
              variant="contained"
              type="button"
              className={styles.add_btn}
              startIcon={<Add className={styles.btn_icon} />}
              onClick={() =>
                append({
                  name: "",
                  file_select_type: "",
                  issue_number: "",
                  deadline: "",
                  file: "",
                })
              }
            ></MainButton>

            <MainButton
              variant="contained"
              onClick={() => remove(index + 1)}
              type="button"
            >
              <Delete className={styles.delete_icon} />
            </MainButton>
          </div>

          <div className={styles.increasing_deadline}>
            <h4>Վերջնաժամկետ</h4>
            <TextInput
              control={control}
              name={`${name}.${index + 1}.deadline`}
              type="date"
              size="small"
            />
          </div>

          <UploadFile
            control={control}
            name={`${name}.${index + 1}.file`}
            url={url}
            index={index + 1}
            placeholder="File Type"
            size="small"
            className={styles.add_file}
          />
        </div>
      ))}
    </div>
  );
};

export default FileInputRow;
