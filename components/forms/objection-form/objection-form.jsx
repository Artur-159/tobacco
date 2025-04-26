import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../text-input/text-input";
import Image from "../../uploads/image/image";
import MainSelect from "../../main-select/main-select";
import DateInput from "../../date-input/date-input";
import { PartnerAPI } from "../../../services/partner";
import Params from "../../../helpers/params";
import { CompanyAPI } from "../../../services/company";

import styles from "./styles.module.scss";

const ObjectionForm = ({ control, image, errors }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.list);
  const applicants = useSelector((state) => state.partner.applicants);

  const registrarOptions = useMemo(
    () =>
      applicants.map((partner) => ({
        value: partner.id,
        label: partner.name,
      })),
    [applicants]
  );

  const representativeOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        label: company.name,
      })),
    [companies]
  );

  useEffect(() => {
    dispatch(
      PartnerAPI.getPartnersApplicant({
        company_is: "applicant",
        offset: 0,
        limit: 30,
      })
    );
    dispatch(CompanyAPI.getCompanies(Params()));
  }, [dispatch]);

  return (
    <div className={styles.form_input_wrapper}>
      <div>
        <TextInput
          type="text"
          size="small"
          control={control}
          name="application_number"
          placeholder="Հայտի համար *"
          className={styles.form_input}
          error={errors.application_number?.message}
        />

        <DateInput
          control={control}
          name="filling_date"
          className={styles.date_input}
          placeholder="Հայտի ներկայացման թվական"
        />

        <TextInput
          size="small"
          type="number"
          control={control}
          name="registration_number"
          className={styles.form_input}
          placeholder="Գրանցման համար"
        />

        <DateInput
          control={control}
          name="registration_date"
          className={styles.date_input}
          placeholder="Գրանցման թվական"
        />
        <DateInput
          control={control}
          name="designation_date"
          className={styles.date_input}
          placeholder="Առարկության թվական"
        />

        <DateInput
          control={control}
          className={styles.date_input}
          name="designation_expired_date"
          placeholder="Առարկության վերջնաժամկետ"
        />

        <MainSelect
          isMulti={false}
          name="registrar"
          control={control}
          placeholder="Գրանցողը"
          options={registrarOptions}
        />
        <MainSelect
          isMulti={true}
          control={control}
          name="representatives"
          options={representativeOptions}
          placeholder="Առարկություն ներկայացնողը"
        />
      </div>
      <div>
        <TextInput
          type="text"
          size="small"
          control={control}
          name="trade_mark_name"
          className={styles.form_input}
          placeholder="Ապրանքային նշան *"
          error={errors.trade_mark_name?.message}
        />
        <TextInput
          type="text"
          size="small"
          control={control}
          className={styles.form_input}
          name="trade_mark_armenian_name"
          placeholder="Ապրանքային նշանը Հայերեն *"
          error={errors.trade_mark_armenian_name?.message}
        />
        <Image
          image={image}
          control={control}
          name="image_upload"
          className={styles.image}
        />
        <TextInput
          rows={2}
          type="text"
          multiline={true}
          control={control}
          name="description"
          placeholder="Նկարագրություն"
          className={styles.inp_desc}
        />
      </div>
    </div>
  );
};

export default ObjectionForm;
