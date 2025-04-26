import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ObjectionsAPI } from "../../../../services/objections";
import { setStatus, setErrorStatus } from "../../../../store/objections/slice";
import Params from "../../../../helpers/params";
import {
  DESIGNATION_INFO,
  INFO_SECTION_DATA,
} from "../../../../constant/objections";
import { getDisplayValue } from "../../../../utils/get-display-value";
import { DELETE_MESSAGE } from "../../../../constant/delete-message";
import MenuButton from "../../../../components/menu-button/menu-button";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import { Edit, Delete, InfoOutlined, AttachFile } from "@mui/icons-material";
import { handleResponseStatus } from "../../../../utils/handle-response-status.js";
import { getClassByDocType } from "../../../../utils/get-Class-By-Doc-Type.js";
import PermissionGuard from "../../../../hoc/permission-guard/permission-guard.jsx";

import styles from "./styles.module.scss";

const List = ({ actions }) => {
  const dispatch = useDispatch();
  const { status, errorStatus, list } = useSelector(
    (state) => state.objections
  );

  const onSubmit = (id) => {
    let data = {
      pdf_image: "yes",
      print: "pdf",
    };
    data = { ...data, id };
    dispatch(ObjectionsAPI.getObjection({ ...data }));
  };

  useEffect(() => {
    dispatch(ObjectionsAPI.getObjections(Params()));
  }, [dispatch, status]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatus(null) }],
      successMessage: "Հաջողությամբ հեռացված է ցանկից",
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setErrorStatus()),
    });
  }, [status, errorStatus, dispatch]);

  return list?.length ? (
    <div className={styles.list}>
      {list?.map((item) => (
        <div className={styles.objection} key={item.id}>
          <div className={styles.objection_head_info}>
            <Link
              className={styles.objection_head}
              to={`/objections/detail/${item.id}`}
            >
              <p>{item.id}.</p>
              <p>
                {item.trade_mark_name} /{" "}
                <span className={styles.trademark_arm}>
                  {item.trade_mark_armenian_name}
                </span>
              </p>
            </Link>

            <MenuButton className={styles.menu}>
              <PermissionGuard>
                <MainButton
                  startIcon={<Edit />}
                  onClick={() => actions.edit(item.id)}
                >
                  Փոխել
                </MainButton>
              </PermissionGuard>
              <MainButton
                startIcon={<InfoOutlined />}
                onClick={() => actions.navigateToDetail(item.id)}
              >
                Մանրամասներ
              </MainButton>

              <PermissionGuard>
                <MainButton
                  startIcon={
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/pin.svg`}
                      alt="Attach Country Icon"
                      width={20}
                      height={20}
                    />
                  }
                  onClick={() => actions.navigateAttachCountry(item.id)}
                >
                  Կցել երկիր
                </MainButton>
              </PermissionGuard>

              <MainButton
                onClick={() => onSubmit(item.id)}
                startIcon={
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/pdf.svg`}
                    alt="pdf Icon"
                    width={20}
                    height={20}
                  />
                }
              >
                Արտածել PDF
              </MainButton>
              <PermissionGuard>
                <MainButton
                  startIcon={<AttachFile />}
                  onClick={() => actions.navigateToLedgerDocs(item.id)}
                >
                  Կցել փաստաթուղթ
                </MainButton>
              </PermissionGuard>
              <PermissionGuard>
                <MainButton
                  startIcon={<AttachFile />}
                  onClick={() => actions.navigateToOperations(item.id)}
                >
                  Կցել գործառնություն
                </MainButton>
              </PermissionGuard>
              <PermissionGuard>
                <BasicModal
                  title="Ջնջել"
                  color="error"
                  startIcon={<Delete />}
                  modalId={`objection-delete-${item.id}`}
                >
                  <p>{DELETE_MESSAGE}</p>
                  <MainButton
                    color="error"
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() =>
                      actions.delete(item.id, `objection-delete-${item.id}`)
                    }
                  >
                    Ջնջել
                  </MainButton>
                </BasicModal>
              </PermissionGuard>
            </MenuButton>
          </div>
          <Link
            to={`/objections/detail/${item.id}`}
            className={styles.objection_info}
          >
            <img
              width={180}
              height={180}
              alt={item.trade_mark_name}
              className={styles.objection_img}
              src={
                item.image_upload
                  ? `${process.env.REACT_APP_BASE_URL_IMG}${item.image_upload}`
                  : `${process.env.PUBLIC_URL}/images/no-image.svg`
              }
            />

            <div className={styles.info_section}>
              {INFO_SECTION_DATA.map(({ label, value }) => (
                <div key={label} className={styles.info_item}>
                  <h4>{label}</h4>
                  <p>{getDisplayValue(item[value])}</p>
                </div>
              ))}
            </div>
            <div className={styles.info_section}>
              {DESIGNATION_INFO.map(({ label, value }) => (
                <div key={label} className={styles.info_item}>
                  <h4>{label}</h4>
                  <p>{getDisplayValue(item[value])}</p>
                </div>
              ))}
            </div>

            <div>
              <div className={styles.info_section}>
                <div className={styles.info_item}>
                  <h4>Գրանցողը</h4>
                  <p>{getDisplayValue(item.registrar)}</p>
                </div>
                <div className={styles.info_item}>
                  <h4>Առարկություն ներկայացնողը</h4>
                  {item.representatives?.length
                    ? item.representatives?.map((rep, i) => (
                        <p key={i}>
                          {rep}
                          {i < item.representatives.length - 1 && " / "}
                        </p>
                      ))
                    : "—"}
                </div>
              </div>

              <div className={styles.info_section}>
                <div className={styles.info_item}>
                  <h4>Գրանցված երկրները</h4>
                  {item.attach_countries?.map((data, i) => (
                    <p
                      key={i}
                      className={getClassByDocType(data.ledger_doc?.doc_type)}
                    >
                      {data.country.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <h4>Այս պահին ցանկը դատարկ է</h4>
  );
};

export default List;
