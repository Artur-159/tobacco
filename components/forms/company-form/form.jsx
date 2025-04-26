import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CityAPI } from "../../../services/city";
import { COMPANY_DATA } from "../../../constant/company";
import { SelectOption } from "../../../utils/select-options";
import Image from "../../uploads/image/image";
import MainSelect from "../../main-select/main-select";
import TextInput from "../../text-input/text-input";
import AddInput from "../../add-input/add-input";

import styles from "../../../pages/partner/styles.module.scss";

const CompanyForm = ({ control, errors, className }) => {
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.city);
  const { image } = useSelector((state) => state.image);
  let optionsValue = SelectOption(list);

  useEffect(() => {
    dispatch(CityAPI.getCities());
  }, [dispatch]);

  return (
    <div className={className}>
      <div className={styles.form}>
        {COMPANY_DATA?.map((item, index) =>
          item.name === "city_id" ? (
            <div key={index} className={styles.form_input}>
              <MainSelect
                control={control}
                name={item.name}
                options={optionsValue}
                className={styles.select}
                placeholder={item.placeholder}
              />
            </div>
          ) : (
            <TextInput
              key={index}
              control={control}
              name={item.name}
              size="small"
              className={styles.form_input}
              placeholder={item.placeholder}
              error={errors[item.name]?.message}
            />
          )
        )}

        <div className={styles.add_phone_number}>
          <AddInput
            name="phones"
            type="number"
            control={control}
            placeholder="Հեռախոսահամար"
            className={styles.add_input}
          />
        </div>
        <div className={styles.add_imp_img}>
          <Image control={control} name="image" image={image} />
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
