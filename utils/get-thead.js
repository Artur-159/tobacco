import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { formatIsoDate } from "./format-iso-date";
import MainButton from "../components/button/button";
import BasicModal from "../components/modal/modal";
import { DELETE_MESSAGE } from "../constant/delete-message";
import { FILE_TYPE_OPTIONS } from "../constant/partner";
import { getClassByDocType } from "./get-Class-By-Doc-Type";
import PermissionGuard from "../hoc/permission-guard/permission-guard";

import styles from "../pages/ledger-docs/styles.module.scss";

const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

export const GET_LEDGER_DOCS_THEAD = (deleteHandler) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      display: "flex",
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
    {
      field: "doc_type",
      headerName: "Փաստաթղթեր",
      width: 400,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
          className={styles.doc_name}
        >
          {params.row.doc_type}
          {params.row.description ? <p> {params.row.description}</p> : null}
        </Link>
      ),
    },
    {
      field: "created_at",
      headerName: "Ամսաթիվ",
      headerAlign: "center",
      display: "flex",
      align: "center",
      width: 130,
      valueGetter: (params) => formatIsoDate(params),
    },
    {
      field: "file.extension",
      headerName: "",
      width: 70,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          <img
            height={32}
            alt={params.row.file.extension}
            src={`/icons/${params.row.file.extension.toLowerCase()}.png`}
          />
        </Link>
      ),
    },
    {
      field: "file",
      headerName: "Ֆայլի անվանումը",
      width: 330,
      display: "flex",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params?.row?.file?.path}
        >
          {params.row.file.path.split("/").pop()}
        </Link>
      ),
    },
    {
      field: "trade_mark",
      headerName: "Ապրանքանիշ",
      width: 230,
      display: "flex",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.trade_mark ? (
          <Link
            rel="noopener noreferrer"
            preventScrollReset={true}
            to={`/trademark/detail/${params.row.trade_mark.id}`}
          >
            {params.row.trade_mark.trade_mark_name}
          </Link>
        ) : null,
    },
    {
      field: "objection",
      headerName: "Առարկություն",
      width: 230,
      display: "flex",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.objection ? (
          <Link
            rel="noopener noreferrer"
            preventScrollReset={true}
            to={`/objections/detail/${params.row.objection.id}`}
          >
            {params.row.objection.trade_mark_name}
          </Link>
        ) : null,
    },
    {
      field: "edit",
      headerName: "",
      headerAlign: "center",
      display: "flex",
      align: "right",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <PermissionGuard>
          <BasicModal
            color="error"
            title="Ջնջել"
            startIcon={<DeleteIcon />}
            modalId={`delete-modal-${params.row.id}`}
          >
            <p>{DELETE_MESSAGE}</p>
            <MainButton
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() =>
                deleteHandler(params.row.id, `delete-modal-${params.row.id}`)
              }
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </PermissionGuard>
      ),
    },
  ];
};

export const GET_OPERATIONS_THEAD = (deleteHandler) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      display: "flex",
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
    {
      field: "operation_type",
      headerName: "Գործառնություն",
      width: 240,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={styles.doc_name}
          to={BASE_URL + params.row.file.path}
        >
          {params.row.operation_type}
          {params.row.description ? <p> {params.row.description}</p> : null}
        </Link>
      ),
    },
    {
      field: "created_at",
      headerName: "Ամսաթիվ",
      headerAlign: "center",
      align: "center",
      display: "flex",
      width: 140,
      valueGetter: (params) => formatIsoDate(params),
    },
    {
      field: "file.extension",
      headerName: "",
      width: 70,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          <img
            height={32}
            alt={params.row.file.extension}
            src={`/icons/${params.row.file.extension.toLowerCase()}.png`}
          />
        </Link>
      ),
    },
    {
      field: "file",
      headerName: "Ֆայլի անվանումը",
      width: 330,
      headerAlign: "center",
      display: "flex",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          {params.row.file.path.split("/").pop()}
        </Link>
      ),
    },
    {
      field: "trade_mark",
      headerName: "Ապրանքանիշ",
      width: 260,
      headerAlign: "center",
      display: "flex",
      align: "center",
      renderCell: (params) =>
        params.row.trade_mark ? (
          <Link
            rel="noopener noreferrer"
            preventScrollReset={true}
            to={`/trademark/detail/${params.row.trade_mark.id}`}
          >
            {params.row.trade_mark.trade_mark_name}
          </Link>
        ) : null,
    },
    {
      field: "objection",
      headerName: "Առարկություն",
      width: 260,
      display: "flex",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.objection ? (
          <Link
            rel="noopener noreferrer"
            preventScrollReset={true}
            to={`/objections/detail/${params.row.objection.id}`}
          >
            {params.row.objection.trade_mark_name}
          </Link>
        ) : null,
    },

    {
      field: "amount",
      headerName: "Գումար",
      width: 180,
      headerAlign: "center",
      display: "flex",
      align: "center",
      sortable: false,
      valueGetter: (value, row) =>
        value && row.currency && `${value} ${row.currency}`,
    },
    {
      field: "delete",
      headerName: "",
      headerAlign: "center",
      align: "right",
      display: "flex",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <PermissionGuard>
          <BasicModal
            color="error"
            title="Ջնջել"
            startIcon={<DeleteIcon />}
            modalId={`delete-modal-${params.row.id}`}
          >
            <p>{DELETE_MESSAGE}</p>
            <MainButton
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() =>
                deleteHandler(params.row.id, `delete-modal-${params.row.id}`)
              }
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </PermissionGuard>
      ),
    },
  ];
};

export const GET_PARTNER_DETAILS_TABLE_THEAD = () => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      display: "flex",
      headerAlign: "left",
      align: "center",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Փաստաթղթի անուն",
      width: 180,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "file_select_type",
      headerName: "Փաստաթղթի տեսակ",
      width: 180,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
      valueGetter: (params) =>
        FILE_TYPE_OPTIONS.find((option) => option.value === params)?.label ??
        "N/A",
    },
    {
      field: "issue_number",
      headerName: "Տրման թիվ",

      width: 180,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "deadline",
      headerName: "Տրման վերջնաժամկետ",
      width: 180,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "upload_file",
      headerName: "Փաստաթուղթ",
      width: 500,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) =>
        params.row.file_path && params.row.file_path !== "N/A" ? (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={BASE_URL + params.row.file_path}
          >
            {params.row.file_path.split("/").pop()}
          </Link>
        ) : (
          "N/A"
        ),
    },
  ];
};

export const GET_DETAIL_LEDGER_DOCS_THEAD = (deleteHandler) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      display: "flex",
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
    {
      field: "doc_type",
      headerName: "Փաստաթուղթ",
      width: 600,
      display: "flex",
      headerAlign: "center",
      align: "left",
      sortable: false,
    },

    {
      field: "file.extension",
      headerName: "",
      width: 100,
      display: "flex",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          <img
            height={32}
            alt={params.row.file.extension}
            src={`/icons/${params.row.file.extension.toLowerCase()}.png`}
          />
        </Link>
      ),
    },
    {
      field: "file",
      headerName: "Ֆայլի անվանումը",
      width: 550,
      display: "flex",
      headerAlign: "center",
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          <div className={styles.doc_name}>
            {params.row.file.path.split("/").pop()}
            <div className={styles.date_block}>
              <p>Ավելացված է</p>
              <p>{formatIsoDate(params.row.created_at)}</p>
            </div>
          </div>
        </Link>
      ),
    },

    {
      field: "delete",
      headerName: "",
      headerAlign: "center",
      align: "right",
      display: "flex",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <PermissionGuard>
          <BasicModal
            color="error"
            title="Ջնջել"
            startIcon={<DeleteIcon />}
            modalId={`delete-modal-${params.row.id}`}
          >
            <p>{DELETE_MESSAGE}</p>
            <MainButton
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() =>
                deleteHandler(params.row.id, `delete-modal-${params.row.id}`)
              }
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </PermissionGuard>
      ),
    },
  ];
};

export const GET_DETAIL_OPERATIONS_THEAD = (deleteHandler) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      display: "flex",
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
    {
      field: "operation_type",
      headerName: "Գործառնություն",
      width: 400,
      display: "flex",
      headerAlign: "center",
      align: "left",
      sortable: false,
    },

    {
      field: "file.extension",
      headerName: "",
      width: 100,
      display: "flex",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={BASE_URL + params.row.file.path}
        >
          <img
            height={32}
            alt={params.row.file.extension}
            src={`/icons/${params.row.file.extension.toLowerCase()}.png`}
          />
        </Link>
      ),
    },
    {
      field: "file",
      headerName: "Ֆայլի անվանումը",
      width: 550,
      headerAlign: "center",
      display: "flex",
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className={styles.doc_name}
          to={BASE_URL + params.row.file.path}
        >
          <div className={styles.date_block}>
            <p>Ավելացված է</p>
            <p>{formatIsoDate(params.row.created_at)}</p>
          </div>
          {params.row.file.path.split("/").pop()}
        </Link>
      ),
    },

    {
      field: "amount",
      headerName: "Գումար",
      width: 250,
      headerAlign: "center",
      display: "flex",
      align: "center",
      sortable: false,
      valueGetter: (value, row) =>
        value && row.currency && `${value} ${row.currency}`,
    },
    {
      field: "delete",
      headerName: "",
      headerAlign: "center",
      align: "right",
      display: "flex",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <PermissionGuard>
          <BasicModal
            color="error"
            title="Ջնջել"
            startIcon={<DeleteIcon />}
            modalId={`delete-modal-${params.row.id}`}
          >
            <p>{DELETE_MESSAGE}</p>
            <MainButton
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() =>
                deleteHandler(params.row.id, `delete-modal-${params.row.id}`)
              }
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </PermissionGuard>
      ),
    },
  ];
};

export const GET_DETAIL_COUNTRIES_THEAD = (
  navigateToAttachCountry,
  deleteHandler
) => {
  return [
    {
      field: "country",
      headerName: "Երկիրը",
      width: 450,
      display: "flex",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <div className={styles.country_doc}>
          <img
            width={30}
            height={26}
            alt={params.row.country.name}
            src={BASE_URL + params.row.country.image}
          />
          <p className={getClassByDocType(params.row.ledger_doc?.doc_type)}>
            {params.row.country.name}
          </p>
        </div>
      ),
    },
    {
      field: "file.extension",
      headerName: "",
      width: 100,
      display: "flex",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) =>
        params.row.ledger_doc ? (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={BASE_URL + params.row.ledger_doc?.file?.path}
          >
            <img
              height={32}
              alt={params.row.ledger_doc?.file?.extension}
              src={`/icons/${params.row.ledger_doc?.file?.extension.toLowerCase()}.png`}
            />
          </Link>
        ) : (
          "N/A"
        ),
    },

    {
      field: "name",
      headerName: "Գրանցման կամ մերժման որոշումը",
      width: 800,
      headerAlign: "center",
      display: "flex",
      align: "left",
      sortable: false,
      renderCell: (params) =>
        params.row.ledger_doc?.file ? (
          <div className={styles.country_info}>
            <div>
              <div>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to={BASE_URL + params.row.ledger_doc?.file?.path}
                  className={getClassByDocType(params.row.ledger_doc?.doc_type)}
                >
                  {params.row.ledger_doc.doc_type}
                </Link>
                :
                <span className={styles.description}>
                  {params.row.ledger_doc.description}
                </span>
                :
                <button onClick={() => navigateToAttachCountry(params.row)}>
                  Կցել այլ որոշում
                </button>
              </div>
              <p>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to={BASE_URL + params.row.ledger_doc?.file?.path}
                >
                  {params.row.ledger_doc.file.path.split("/").pop()}
                </Link>
                : Ավելացված է {formatIsoDate(params.row.created_at)}
              </p>
            </div>
          </div>
        ) : (
          <div>
            Որոշումը կցված չէ:{" "}
            <button onClick={() => navigateToAttachCountry(params.row)}>
              Կցել որոշումը
            </button>
          </div>
        ),
    },
    {
      field: "delete",
      headerName: "",
      headerAlign: "center",
      align: "right",
      display: "flex",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <PermissionGuard>
          <BasicModal
            color="error"
            title="Ջնջել"
            startIcon={<DeleteIcon />}
            modalId={`delete-modal-${params.row.id}`}
          >
            <p>{DELETE_MESSAGE}</p>
            <MainButton
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() =>
                deleteHandler(params.row.id, `delete-modal-${params.row.id}`)
              }
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </PermissionGuard>
      ),
    },
  ];
};
