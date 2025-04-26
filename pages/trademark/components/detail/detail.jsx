import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TradeMarkAPI } from "../../../../services/trademark";
import Back from "../../../../components/back-btn/back-btn";
import { MARK_TYPE } from "../../../../constant/trademark";
import { PartnerAPI } from "../../../../services/partner";
import { getDisplayValue } from "../../../../utils/get-display-value";
import { LedgerDocsAPI } from "../../../../services/ledger-docs";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  GET_DETAIL_COUNTRIES_THEAD,
  GET_DETAIL_LEDGER_DOCS_THEAD,
  GET_DETAIL_OPERATIONS_THEAD,
} from "../../../../utils/get-thead";
import { setId as setLedgerDocsId } from "../../../../store/ledger-docs/slice";
import { setId as setOperationId } from "../../../../store/operations/slice";
import { setModalOpen } from "../../../../store/modal/slice";
import { OperationsAPI } from "../../../../services/operations";
import { setAttachedCountry } from "../../../../store/trademark/slice";

import styles from "../../styles.module.scss";
import {
  setClearAttachObjection,
  setClearAttachTradeMark,
} from "../../../../store/attach-country/slice";

const TrademarkDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorizes } = useSelector((state) => state.partner);
  const { oneTradeMark } = useSelector((state) => state.tradeMark);
  const { list: ledgerDocs } = useSelector((state) => state.ledgerDocs);
  const { list: operations } = useSelector((state) => state.operations);

  const {
    application_number,
    publication_date,
    publication_expiry,
    filling_date,
    registration_date,
    registration_expiry_date,
    designation_date,
    designation_expired_date,
    rejection_date,
    rejection,
    termination_date,
    owner_id,
    representatives,
    trade_mark_name,
    trade_mark_armenian_name,
    image_path,
    types,
    classes,
    vienna_classification,
    description,
    attach_countries,
  } = oneTradeMark || {};

  const trademarkTypes = types?.length
    ? MARK_TYPE.filter((type) => types.includes(type.value))
        .map((type) => type.label)
        .join(", ")
    : [];

  const currentRepresentatives = representatives?.length
    ? authorizes
        .filter((type) => representatives.includes(type.id))
        .map((item) => item.name)
        .join(", ")
    : "N/A";

  const deleteHandler = (id) => {
    dispatch(LedgerDocsAPI.deleteLedgerDoc(id));
    dispatch(setLedgerDocsId(id));
    dispatch(setModalOpen(false));
  };

  const operationDeleteHandler = (id, modalId) => {
    dispatch(OperationsAPI.deleteOperation(id));
    dispatch(setOperationId(id));
    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  const deleteAttachCountry = (id, modalId) => {
    dispatch(TradeMarkAPI.deleteAttachedCountry(id)).then(() => {
      dispatch(setAttachedCountry(id));
      dispatch(setModalOpen({ modalId, isOpen: false }));
    });
  };

  useEffect(() => {
    dispatch(
      PartnerAPI.getPartnersAuthorized({
        company_is: "authorized",
      })
    );
    dispatch(TradeMarkAPI.getOneTradeMark(id));
    dispatch(LedgerDocsAPI.getLedgerDocs({ filter_trade_mark: id }));
    dispatch(OperationsAPI.getOperations({ trade_mark_filter: id }));
    dispatch(setClearAttachTradeMark());
    dispatch(setClearAttachObjection());
  }, [dispatch, id]);

  return (
    <div className={styles.service}>
      <Back />
      <h1 className={styles.title}>
        {trade_mark_name} \ {trade_mark_armenian_name}
      </h1>
      <div className={styles.details_container}>
        <div className={styles.section}>
          <h3>Հիմնական տեղեկություններ</h3>
          <div className={styles.row}>
            <span>ID:</span>
            <span>{id}</span>
          </div>
          <div className={styles.row}>
            <span>Հայտի համար:</span>
            <span>{application_number}</span>
          </div>
          <div className={styles.row}>
            <span>Ապրանքային նշան:</span>
            <span>{trade_mark_name}</span>
          </div>
          <div className={styles.row}>
            <span>Ապրանքային նշանը Հայերեն:</span>
            <span>{trade_mark_armenian_name}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Ամսաթվեր</h3>
          <div className={styles.row}>
            <span>Հրապարակման թվական:</span>
            <span>{getDisplayValue(publication_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Հրապարակման ավարտ:</span>
            <span>{getDisplayValue(publication_expiry, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Հայտի ներկայացման թվական:</span>
            <span>{getDisplayValue(filling_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Գրանցման թվական:</span>
            <span>{getDisplayValue(registration_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Գրանցման ենթադրյալ ավարտ:</span>
            <span>{getDisplayValue(registration_expiry_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Առարկության թվական:</span>
            <span>{getDisplayValue(designation_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Առարկության վերջնաժամկետ:</span>
            <span>{getDisplayValue(designation_expired_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Մերժման ամսաթիվ:</span>
            <span>{getDisplayValue(rejection_date, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Դադարեցման ամսաթիվ:</span>
            <span>{getDisplayValue(termination_date, "N/A")}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Լրացուցիչ տեղեկություններ</h3>
          <div className={styles.row}>
            <span>Սեփականատեր:</span>
            <span>{getDisplayValue(owner_id, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Լիազորված անձ:</span>
            <span>{currentRepresentatives}</span>
          </div>
          <div className={styles.row}>
            <span>Ապրանքներ և ծառայություններ, Նիցայի դասակարգիչ:</span>
            <ul>
              {classes?.length
                ? classes?.map((cls) => (
                    <li key={cls.class_id}>
                      <em>{cls.name}</em> - {cls.value}
                    </li>
                  ))
                : "N/A"}
            </ul>
          </div>
          <div className={styles.row}>
            <span>Վիեննայի դասակարգիչ:</span>
            <span>{getDisplayValue(vienna_classification, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Նկարագրություն:</span>
            <span>{getDisplayValue(description, "N/A")}</span>
          </div>
          <div className={styles.row}>
            <span>Ապրանքային նշանի տեսակ:</span>
            {trademarkTypes}
          </div>
          <div className={styles.row}>
            <span>Մերժում:</span>
            {rejection}
          </div>
          <div className={styles.row}>
            <span>
              <img
                width={180}
                alt="objection"
                className={styles.image}
                src={
                  image_path
                    ? `${process.env.REACT_APP_BASE_URL_IMG}${image_path}`
                    : `${process.env.PUBLIC_URL}/images/no-image.svg`
                }
              />
            </span>
          </div>
        </div>
      </div>

      <h2 className={styles.table_title}>
        <Link to={`/ledger-docs?TM=${id}`}>
          <img src="/icons/documents.svg" alt="icon" />
        </Link>
        Փաստաթղթեր
      </h2>
      <Paper elevation={3}>
        <DataGrid
          hideFooter
          rows={ledgerDocs}
          disableColumnMenu
          getRowHeight={() => "auto"}
          localeText={{ noRowsLabel: "Տվյալներ չկան" }}
          columns={GET_DETAIL_LEDGER_DOCS_THEAD(deleteHandler)}
        />
      </Paper>

      <h2 className={styles.table_title}>
        <Link to={`/operations?TM=${id}`}>
          <img src="/icons/operations.svg" alt="operations icon" />
        </Link>
        Գործառնություններ
      </h2>
      <Paper elevation={3}>
        <DataGrid
          hideFooter
          rows={operations}
          disableColumnMenu
          getRowHeight={() => "auto"}
          localeText={{ noRowsLabel: "Տվյալներ չկան" }}
          columns={GET_DETAIL_OPERATIONS_THEAD(operationDeleteHandler)}
        />
      </Paper>

      <h2 className={styles.table_title}>
        <Link to={`/trademark/attach-country/${id}`}>
          <img src="/icons/pin.svg" alt="country icon" />
        </Link>
        Կցված երկրներ
      </h2>
      <Paper elevation={3}>
        <DataGrid
          hideFooter
          disableColumnMenu
          rows={Array.isArray(attach_countries) ? attach_countries : []}
          getRowHeight={() => "auto"}
          localeText={{ noRowsLabel: "Տվյալներ չկան" }}
          columns={GET_DETAIL_COUNTRIES_THEAD((row) => {
            const id = row?.id;
            if (id) {
              navigate(`/trademark/edit-attach-country/${id}`);
            }
          }, deleteAttachCountry)}
        />
      </Paper>
    </div>
  );
};

export default TrademarkDetail;
