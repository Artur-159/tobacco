import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Back from "../../../../components/back-btn/back-btn";
import { ObjectionsAPI } from "../../../../services/objections";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import { AuthorizationAPI } from "../../../../services/authorization";
import { LedgerDocsAPI } from "../../../../services/ledger-docs";
import { setModalOpen } from "../../../../store/modal/slice";
import {
  GET_DETAIL_COUNTRIES_THEAD,
  GET_DETAIL_LEDGER_DOCS_THEAD,
  GET_DETAIL_OPERATIONS_THEAD,
} from "../../../../utils/get-thead";
import { OperationsAPI } from "../../../../services/operations";
import { setId as setLedgerDocsId } from "../../../../store/ledger-docs/slice";
import { setId as setOperationId } from "../../../../store/operations/slice";
import { setAttachedCountry } from "../../../../store/objections/slice";
import {
  getAdditionalInfo,
  getDetailRows,
} from "../../../../constant/objections";
import { renderDetailRow } from "../../../../helpers/render-detail-row";

import styles from "../../styles.module.scss";

const useObjectionDetails = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ObjectionsAPI.getObjection(id));
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartnersApplicant({ company_is: "applicant" }));
    dispatch(AuthorizationAPI.getUsersList());
    dispatch(LedgerDocsAPI.getLedgerDocs({ filter_objection: id }));
  }, [dispatch, id]);
};

const ObjectionDetail = () => {
  const { id } = useParams();
  useObjectionDetails(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.company);
  const { applicants } = useSelector((state) => state.partner);
  const { usersList } = useSelector((state) => state.authorization);
  const { oneObjection } = useSelector((state) => state.objections);
  const { list: ledgerDocs } = useSelector((state) => state.ledgerDocs);
  const { list: operations } = useSelector((state) => state.operations);

  const {
    creator,
    application_number,
    filling_date,
    registration_number,
    registration_date,
    designation_date,
    designation_expired_date,
    registrar,
    trade_mark_name,
    trade_mark_armenian_name,
    image_upload,
    description,
    representatives,
    attach_countries,
  } = oneObjection || {};

  const currentUser =
    usersList?.find((user) => user.id === creator)?.name || "N/A";
  const currentApplicant =
    applicants?.find((applicant) => applicant.id === registrar)?.name || "N/A";
  const currentRepresentatives = useMemo(
    () =>
      representatives?.length
        ? list
            .filter((type) => representatives.includes(type.id))
            .map((item) => item.name)
            .join(", ")
        : "N/A",
    [list, representatives]
  );

  const DETAIL_ROWS = getDetailRows({
    id,
    application_number,
    trade_mark_name,
    trade_mark_armenian_name,
    registration_number,
    registration_date,
    filling_date,
    designation_date,
    designation_expired_date,
  });

  const ADDITIONAL_INFO = getAdditionalInfo({
    currentUser,
    currentApplicant,
    description,
    currentRepresentatives,
  });

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
    dispatch(ObjectionsAPI.deleteAttachedCountry(id)).then(() => {
      dispatch(setAttachedCountry(id));
      dispatch(setModalOpen({ modalId, isOpen: false }));
    });
  };

  useEffect(() => {
    dispatch(ObjectionsAPI.getObjection(id));
    dispatch(CompanyAPI.getCompanies());
    dispatch(
      PartnerAPI.getPartnersApplicant({
        company_is: "applicant",
      })
    );
    dispatch(AuthorizationAPI.getUsersList());
    dispatch(LedgerDocsAPI.getLedgerDocs({ filter_objection: id }));
    dispatch(OperationsAPI.getOperations({ filter_objection: id }));
  }, [dispatch, id]);

  return (
    <div className={styles.service}>
      <Back />
      <h2 className={styles.title}>
        {trade_mark_name} / {trade_mark_armenian_name}
      </h2>

      <div className={styles.details_container}>
        <div className={styles.section}>
          <h3>Տեղեկություններ</h3>
          {DETAIL_ROWS.map((row) => renderDetailRow(row.label, row.value))}
        </div>
        <div className={styles.section}>
          <h3>Լրացուցիչ տեղեկություններ</h3>
          {ADDITIONAL_INFO.map((row, index) =>
            renderDetailRow(row.label, row.value)
          )}
          <div className={styles.row}>
            <span></span>
            <span>
              <img
                width={180}
                alt="objection"
                className={styles.image}
                src={
                  image_upload
                    ? `${process.env.REACT_APP_BASE_URL_IMG}${image_upload}`
                    : `${process.env.PUBLIC_URL}/images/no-image.svg`
                }
              />
            </span>
          </div>
        </div>
      </div>

      <h2 className={styles.table_title}>
        <Link to={`/ledger-docs?OB=${id}`}>
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
        <Link to={`/operations?OB=${id}`}>
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
        <Link to={`/objections/attach-country/${id}`}>
          <img src="/icons/pin.svg" alt="country icon" />
        </Link>
        Կցված երկրներ
      </h2>
      <Paper elevation={3}>
        <DataGrid
          hideFooter
          disableColumnMenu
          rows={attach_countries}
          getRowHeight={() => "auto"}
          localeText={{ noRowsLabel: "Տվյալներ չկան" }}
          columns={GET_DETAIL_COUNTRIES_THEAD((row) => {
            const id = row?.id;
            if (id) {
              navigate(`/objections/edit-attach-country/${id}`);
            }
          }, deleteAttachCountry)}
        />
      </Paper>
    </div>
  );
};

export default ObjectionDetail;
