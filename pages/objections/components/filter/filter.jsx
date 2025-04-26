import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CityAPI } from "../../../../services/city";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import { setModalOpen } from "../../../../store/modal/slice";
import { setFilter } from "../../../../store/objections/slice";
import { SelectOption } from "../../../../utils/select-options";
import { generateObjectionsFields } from "../../../../utils/generate-filter-fields";
import MainButton from "../../../../components/button/button";
import { FieldRenderer } from "../field-renderer/field-renderer";

import styles from "./styles.module.scss";

const Filter = ({ modalId }) => {
  const dispatch = useDispatch();

  const { list: companies } = useSelector((state) => state.company);
  const { list: cities } = useSelector((state) => state.city);
  const { filter } = useSelector((state) => state.objections);
  const { applicants } = useSelector((state) => state.partner);

  const defaultValues = filter
    ? {
        ...filter,
      }
    : {
        trade_mark_name: "",
        trade_mark_armenian_name: "",
        application_number: "",
        registration_number: "",
        registrar: "",
        representative: "",
        city_id: "",
      };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartnersApplicant({ company_is: "applicant" }));
    dispatch(CityAPI.getCities());
  }, [dispatch]);

  const options = {
    city: useMemo(() => SelectOption(cities), [cities]),
    registrar: useMemo(() => SelectOption(applicants), [applicants]),
    representative: useMemo(() => SelectOption(companies), [companies]),
  };
  const fields = generateObjectionsFields(control, options);

  useEffect(() => {
    if (filter) {
      const resetValues = {
        ...filter,
        representative: filter.representative ? filter.representative[0] : "",
      };
      reset(resetValues);
    }
  }, [filter, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!data.representative) delete data.representative;

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          (!Array.isArray(value) || value.length > 0)
      )
    );
    dispatch(setFilter(filteredData));
    dispatch(setModalOpen({ modalId, isOpen: false }));
  });

  return (
    <div className={styles.fields_form}>
      <h2>Ընդլայնված ֆիլտր</h2>
      <div className={styles.fields_container}>
        <FieldRenderer
          fields={fields}
          type="TextInput"
          className={styles.inputs_block}
        />
        <FieldRenderer
          fields={fields}
          type="MainSelect"
          className={styles.selects_block}
        />
      </div>
      <MainButton onClick={onSubmit} variant="outlined">
        Հաստատել
      </MainButton>
    </div>
  );
};

export default Filter;
