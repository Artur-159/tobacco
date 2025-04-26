import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GET_PARTNER_DETAILS_TABLE_THEAD } from "../../../../utils/get-thead";
import { getDisplayValue } from "../../../../utils/get-display-value";
import { CompanyAPI } from "../../../../services/company";
import Back from "../../../../components/back-btn/back-btn";
import { CityAPI } from "../../../../services/city";
import { renderDetailRow } from "../../../../helpers/render-detail-row";

import styles from "../../../objections/styles.module.scss";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { oneCompany } = useSelector((state) => state.company);
  const { list } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(CompanyAPI.getOneCompany(id));
    dispatch(CityAPI.getCities());
  }, [dispatch, id]);

  const {
    creator,
    name,
    address,
    fax,
    email,
    website,
    working_days_hours,
    avc,
    tax_type,
    account_number,
    bank,
    image,
    city_id,
    phones,
    upload_file,
  } = oneCompany || {};

  const currentCity = list?.find((city) => city.id === city_id)?.name || "N/A";

  const sections = [
    {
      title: "Հիմնական տեղեկություններ",
      fields: [
        { label: "ID", value: id },
        { label: "Ստեղծողը", value: creator },
        { label: "Կազմակերպության անվանումը", value: name },
        { label: "Հասցե", value: address },
        { label: "Էլ. հասցե", value: email },
        { label: "Երկիր", value: currentCity },
        { label: "ՀՎՀՀ", value: avc },
      ],
    },
    {
      title: "Լրացուցիչ տեղեկություններ",
      fields: [
        { label: "Վեբ-կայք", value: website },
        { label: "Բանկ", value: bank },
        { label: "Հաշվեհամար", value: account_number },
        { label: "Հարկի տեսակը", value: tax_type },
        { label: "Ֆաքս", value: fax },
        { label: "Աշխատանքային օրեր եւ ժամեր", value: working_days_hours },
        { label: "Հեռախոսահամար", value: phones?.join(", ") },
      ],
    },
  ];

  const rows =
    upload_file?.map((file, index) => ({
      id: index + 1,
      name: getDisplayValue(file?.name, "N/A"),
      file_select_type: getDisplayValue(file?.file_select_type, "N/A"),
      issue_number: getDisplayValue(file?.issue_number, "N/A"),
      deadline: getDisplayValue(file?.deadline, "N/A"),
      file_path: getDisplayValue(file?.file?.path, "N/A"),
    })) || [];

  return (
    <div className={styles.service}>
      <Back />
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.details_container}>
        {sections.map((section) => (
          <div className={styles.section} key={section.title}>
            <h3>{section.title}</h3>
            {section.fields.map((field) =>
              renderDetailRow(field.label, field.value)
            )}
            {section.title === "Լրացուցիչ տեղեկություններ" && (
              <div className={styles.row}>
                <img
                  width={100}
                  alt="company"
                  className={styles.image}
                  src={
                    image
                      ? `${process.env.REACT_APP_BASE_URL_IMG}${image}`
                      : `${process.env.PUBLIC_URL}/images/no-image.svg`
                  }
                />
              </div>
            )}
          </div>
        ))}
        <Paper elevation={3} sx={{ mb: 2 }} className={styles.table_section}>
          <DataGrid
            hideFooter
            rows={rows}
            disableColumnMenu
            columns={GET_PARTNER_DETAILS_TABLE_THEAD()}
            localeText={{ noRowsLabel: "Տվյալներ չկան" }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Detail;
