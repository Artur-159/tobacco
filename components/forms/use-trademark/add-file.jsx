import { useFieldArray } from "react-hook-form";
import TextInput from "../../text-input/text-input";
import UploadFile from "../../uploads/file/file";
import MainButton from "../../button/button";
import { Delete, Add } from "@mui/icons-material";

import styles from "../../../pages/partner/styles.module.scss";

const FileAdd = ({ control, name, url }) => {
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
        <TextInput
          control={control}
          name={`${name}.0.description`}
          placeholder="Նկարագրություն"
          className={styles.description_field}
          size="small"
          multiline
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
            accept=".pdf, .doc, .docx, .jpg, .msg, .webp, .jpeg, .avif, .svg"
          />
          <MainButton
            type="button"
            startIcon={<Add className={styles.btn_icon} />}
            onClick={() =>
              append({
                name: "",
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

          <TextInput
            control={control}
            name={`${name}.${index + 1}.description`}
            placeholder="Նկարագրություն"
            className={styles.description_field}
            size="small"
            multiline
          />

          <div className={styles.add_new_files}>
            <h5>Տրման թիվ</h5>
            <TextInput
              control={control}
              name={`${name}.${index + 1}.issue_number`}
              type="date"
              size="small"
            />
          </div>
          <div className={styles.increasing_deadline}>
            <h5>Վերջնաժամկետ</h5>
            <TextInput
              control={control}
              name={`${name}.${index + 1}.deadline`}
              type="date"
              size="small"
            />
          </div>

         <div className={styles.container}>
         <UploadFile
            control={control}
            name={`${name}.${index + 1}.file`}
            url={url}
            index={index + 1}
            placeholder="File Type"
            size="small"
            className={styles.add_file}
            accept=".pdf, .doc, .docx, .jpg, .msg, .webp, .jpeg, .avif, .svg"
          />
          <div className={styles.btn_block}>
            <MainButton
              variant="contained"
              type="button"
              className={styles.add_btn}
              startIcon={<Add className={styles.btn_icon} />}
              onClick={() =>
                append({
                  name: "",
                  issue_number: "",
                  deadline: "",
                  file: "",
                  description: "",
                })
              }
            ></MainButton>

            <MainButton
              type="button"
              variant="contained"
              onClick={() => remove(index + 1)}
            >
              <Delete className={styles.delete_icon} />
            </MainButton>
          </div>
         </div>
        </div>
      ))}
    </div>
  );
};

export default FileAdd;
