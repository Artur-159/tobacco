import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CityAPI } from "../../../../services/city";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import { TradeMarkAPI } from "../../../../services/trademark";
import { setModalOpen } from "../../../../store/modal/slice";
import { setFilter } from "../../../../store/trademark/slice";
import { SelectOption } from "../../../../utils/select-options";
import { generateFormFields } from "../../../../utils/generate-filter-fields";
import { DURATION_OPTIONS } from "../../../../constant/trademark";
import MainButton from "../../../../components/button/button";
import { FieldRenderer } from "../field-renderer/field-renderer";

import styles from "./styles.module.scss";

const Filter = ({ modalId }) => {
  const dispatch = useDispatch();

  const { list: companies } = useSelector((state) => state.company);
  const { list: cities } = useSelector((state) => state.city);
  const { niceClasses, filter } = useSelector((state) => state.tradeMark);
  const { authorizes } = useSelector((state) => state.partner);

  const getExpiryDateString = (filterData) => {
    if (!filterData?.registration_expiry_date?.[0]) {
      return "";
    }

    const expiryDateObj = filterData.registration_expiry_date[0];
    const [key, value] = Object.entries(expiryDateObj)[0] || [];

    return key && value ? `${key}: ${value}` : "";
  };

  const exp_date = DURATION_OPTIONS.find(
    (opt) => opt.value === getExpiryDateString(filter)
  );

  const defaultValues = filter
    ? {
        ...filter,
        classes: filter?.classes ? filter?.classes[0] : "",
        registration_expiry_date: exp_date?.value || "",
        representative: filter.representative ? filter.representative[0] : "",
      }
    : {
        trade_mark_name: "",
        trade_mark_armenian_name: "",
        application_number: "",
        registration_number: "",
        owner_id: "",
        representative: "",
        registration_expiry_date: "",
        classes: "",
        city_id: "",
      };

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartnersAuthorized({ company_is: "authorized" }));
    dispatch(TradeMarkAPI.getNiceClasses());
    dispatch(CityAPI.getCities());
  }, [dispatch]);

  const options = {
    city: useMemo(() => SelectOption(cities), [cities]),
    authorizes: useMemo(() => SelectOption(authorizes), [authorizes]),
    niceClasses: useMemo(() => SelectOption(niceClasses), [niceClasses]),
    owner: useMemo(() => SelectOption(companies), [companies]),
  };
  const fields = generateFormFields(control, options, DURATION_OPTIONS);

  const onSubmit = handleSubmit((data) => {
    if (data.registration_expiry_date) {
      if (
        data.registration_expiry_date === "expired: no" ||
        data.registration_expiry_date === "expired: yes"
      ) {
        data.registration_expiry_date = [
          { expired: data.registration_expiry_date.split(":")[1].trim() },
        ];
      } else if (data.registration_expiry_date.includes(":")) {
        const [key, value] = data.registration_expiry_date
          .split(":")
          .map((item) => item.trim());

        data.registration_expiry_date = [{ [key]: Number(value) }];
      }
    } else {
      delete data.registration_expiry_date;
    }

    if (data.classes) data.classes = [data.classes];
    else delete data.classes;

    if (data.representative) data.representative = [data.representative];
    else delete data.representative;

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
