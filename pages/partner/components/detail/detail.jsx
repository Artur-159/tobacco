import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Back from "../../../../components/back-btn/back-btn";
import { getDisplayValue } from "../../../../utils/get-display-value";
import { CityAPI } from "../../../../services/city";
import { PartnerAPI } from "../../../../services/partner";
import { GET_PARTNER_DETAILS_TABLE_THEAD } from "../../../../utils/get-thead";

import styles from "../../../objections/styles.module.scss";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.city);
  const { onePartner } = useSelector((state) => state.partner);
  const {
    name,
    address,
    city_id,
    phones,
    fax,
    email,
    website,
    working_days_hours,
    avc,
    tax_type,
    account_number,
    bank,
    image,
    upload_file,
  } = onePartner || {};

  const currentCity = list?.find((city) => city.id === city_id)?.name || "N/A";

  const rows =
    upload_file?.map((file, index) => ({
      id: index + 1,
      name: getDisplayValue(file?.name, "N/A"),
      file_select_type: getDisplayValue(file?.file_select_type, "N/A"),
      issue_number: getDisplayValue(file?.issue_number, "N/A"),
      deadline: getDisplayValue(file?.deadline, "N/A"),
      file_path: getDisplayValue(file?.file?.path, "N/A"),
    })) || [];

  useEffect(() => {
    dispatch(PartnerAPI.getOnePartner(id));
    dispatch(CityAPI.getCities());
  }, [dispatch, id]);

  return (
    <div className={styles.service}>
      <Back />

      <h1 className={styles.title}>{name}</h1>
      <div className={styles.details_container}>
        <div className={styles.section}>
          <h3>Հիմնական տեղեկություններ</h3>
          <div className={styles.row}>
            <span>ID:</span>
            <span>{id}</span>
          </div>
          <div className={styles.row}>
            <span>Կազմակերպության անվանումը:</span>
            <span>{name}</span>
          </div>
          <div className={styles.row}>
            <span>Հասցե:</span>
            <span>{getDisplayValue(address, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Էլ. հասցե:</span>
            <span>{getDisplayValue(email, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Վեբ-կայք:</span>
            <span>{getDisplayValue(website, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Երկիր:</span>
            <span>{getDisplayValue(currentCity, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>ՀՎՀՀ:</span>
            <span>{getDisplayValue(avc, "N/A")}</span>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Լրացուցիչ տեղեկություններ</h3>
          <div className={styles.row}>
            <span>Բանկ:</span>
            <span>{getDisplayValue(bank, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Հաշվեհամար:</span>
            <span>{getDisplayValue(account_number, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Հարկի տեսակը:</span>
            <span>{getDisplayValue(tax_type, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Ֆաքս:</span>
            <span>{getDisplayValue(fax, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Աշխատանքային օրեր եւ ժամեր:</span>
            <span>{getDisplayValue(working_days_hours, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Հեռախոսահամար</span>
            <span>{getDisplayValue(phones?.join(", "), "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>
              <img
                width={100}
                alt="partner"
                className={styles.image}
                src={
                  image
                    ? `${process.env.REACT_APP_BASE_URL_IMG}${image}`
                    : `${process.env.PUBLIC_URL}/images/no-image.svg`
                }
              />
            </span>
          </div>
        </div>
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
