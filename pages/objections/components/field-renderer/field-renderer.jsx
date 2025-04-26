import TextInput from "../../../../components/text-input/text-input";
import MainSelect from "../../../../components/main-select/main-select";

import styles from "../../styles.module.scss";

export const FieldRenderer = ({ fields, type, className }) => {
  return (
    <div className={className}>
      {fields
        .filter((field) => field.type === type)
        .map((field, index) => {
          if (type === "TextInput") {
            return (
              <TextInput
                key={index}
                placeholder={field.placeholder}
                control={field.control}
                name={field.name}
                size="small"
              />
            );
          } else if (type === "MainSelect") {
            return (
              <MainSelect
                key={index}
                control={field.control}
                placeholder={field.placeholder}
                name={field.name}
                isMulti={field.multiple}
                options={field.options}
                className={styles.filter_select}
              />
            );
          }
          return null;
        })}
    </div>
  );
};
