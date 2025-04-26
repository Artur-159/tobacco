import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import MenuButton from "../../../../components/menu-button/menu-button";
import { DELETE_MESSAGE } from "../../../../constant/delete-message";
import { FIELDS, FIELDS_COUNTERS } from "../../../../constant/trademark";
import { Edit, Delete, AttachFile, InfoOutlined } from "@mui/icons-material";
import { getDisplayValue } from "../../../../utils/get-display-value";
import { TradeMarkAPI } from "../../../../services/trademark";
import { getClassByDocType } from "../../../../utils/get-Class-By-Doc-Type";
import PermissionGuard from "../../../../hoc/permission-guard/permission-guard";
import { getClassByStatus } from "../../../../utils/get-class-by-status";

import styles from "./styles.module.scss";

const Item = ({ item, actions }) => {
  const dispatch = useDispatch();
  const { id, trade_mark_name, trade_mark_armenian_name, image_path } = item;

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const onSubmit = (id) => {
    let data = {
      pdf_image: "yes",
      print: "pdf",
    };
    data = { ...data, id };
    dispatch(TradeMarkAPI.getOneTradeMark({ ...data }));
  };

  return (
    <div className={styles.list}>
      <div className={styles.info}>
        <div className={styles.number_name}>
          <Link to={`/trademark/detail/${id}`}>
            <p>{id}.</p>
            <p>
              {trade_mark_name} / {trade_mark_armenian_name}
            </p>
          </Link>
          <MenuButton className={styles.menu}>
            <PermissionGuard>
              <MainButton startIcon={<Edit />} onClick={() => actions.edit(id)}>
                Փոխել
              </MainButton>
            </PermissionGuard>
            <MainButton
              startIcon={<InfoOutlined />}
              onClick={() => actions.navigateToDetail(id)}
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
                onClick={() => actions.navigateAttachCountry(id)}
              >
                Կցել երկիր
              </MainButton>
            </PermissionGuard>
            <MainButton
              onClick={() => onSubmit(id)}
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
                onClick={() => actions.navigateToLedgerDocs(id)}
              >
                Կցել փաստաթուղթ
              </MainButton>
            </PermissionGuard>
            <PermissionGuard>
              <MainButton
                startIcon={<AttachFile />}
                onClick={() => actions.navigateToOperations(id)}
              >
                Կցել գործառնություն
              </MainButton>
            </PermissionGuard>
            <PermissionGuard>
              <BasicModal
                title="Ջնջել"
                color="error"
                startIcon={<Delete />}
                modalId={`delete-modal-${id}`}
              >
                <p>{DELETE_MESSAGE}</p>
                <MainButton
                  color="error"
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={() => actions.delete(id, `delete-modal-${id}`)}
                >
                  Ջնջել
                </MainButton>
              </BasicModal>
            </PermissionGuard>
          </MenuButton>
        </div>
        <Link to={`/trademark/detail/${id}`}>
          <div className={styles.info_content}>
          <figure>
              <img
                width={180}
                height={180}
                src={
                  image_path
                    ? `${BASE_URL}${image_path}`
                    : `${process.env.PUBLIC_URL}/images/no-image.svg`
                }
                alt={item?.trade_mark_name}
                className={styles.info_img}
              />
            <figcaption className={getClassByStatus(item.status)}>
              {item.status}
            </figcaption>
          </figure>
            <div className={styles.countries_wrapper}>
              <div className={styles.info_box}>
                {FIELDS.map(({ label, key, format }) => {
                  const value = format
                    ? format(item[key])
                    : getDisplayValue(item[key]);

                  return (
                    <div key={key} className={styles.box}>
                      <h4>{label}</h4>
                      <span>
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : value}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div>
                {FIELDS_COUNTERS.map(({ label, key }) => (
                  <div key={key} className={styles.countries_box}>
                    <h4>{label}</h4>
                    {key === "attach_countries" ? (
                      <div>
                        {item[key].map((data, index) => (
                          <p
                            key={index}
                            className={getClassByDocType(
                              data?.ledger_doc?.doc_type
                            )}
                          >
                            {data?.country?.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p>{item[key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Item;
