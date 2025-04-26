import { useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompanyAPI } from "../../../services/company";
import { MARK_TYPE, TRADE_MARK_FIELDS } from "../../../constant/trademark";
import { SelectOption, getOptions } from "../../../utils/select-options";
import Image from "../../uploads/image/image";
import { PartnerAPI } from "../../../services/partner";

import styles from "../../../pages/trademark/styles.module.scss";

const Form = ({ control, path, errors }) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.company);
  const { authorizes } = useSelector((state) => state.partner);

  const optionsMap = useMemo(
    () => ({
      owner: SelectOption(list),
      representatives: SelectOption(authorizes),
      types: MARK_TYPE,
    }),
    [list, authorizes]
  );

  useEffect(() => {
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartnersAuthorized({ company_is: "authorized" }));
  }, [dispatch]);

  return (
    <>
      <div className={styles.mark_form}>
        <div className={styles.mark_form_left}>
          {TRADE_MARK_FIELDS.slice(0, 9).map(
            ({ component: Component, name, placeholder, options, ...rest }) => (
              <Component
                key={name}
                name={name}
                control={control}
                placeholder={placeholder}
                className={styles.input}
                error={errors[name]?.message}
                options={options ? getOptions(options, optionsMap) : undefined}
                {...rest}
              />
            )
          )}
          <div className={styles.add_imp_img}>
            <Image control={control} name="image_path" image={path} />
          </div>
        </div>
        <div className={styles.mark_form_right}>
          {TRADE_MARK_FIELDS.slice(9).map(
            ({ component: Component, name, placeholder, options, ...rest }) => (
              <Component
                key={name}
                name={name}
                control={control}
                placeholder={placeholder}
                className={styles.input}
                error={errors[name]?.message}
                options={options ? getOptions(options, optionsMap) : undefined}
                {...rest}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Form);
