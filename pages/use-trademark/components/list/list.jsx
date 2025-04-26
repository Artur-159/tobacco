import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UseTrademarkAPI } from "../../../../services/use-trademark";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/use-trademark/slice";
import { setModalOpen } from "../../../../store/modal/slice";
import { Delete, Edit } from "@mui/icons-material";

import PermissionGuard from "../../../../hoc/permission-guard/permission-guard";
import MenuButton from "../../../../components/menu-button/menu-button";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import { DELETE_MESSAGE } from "../../../../constant/delete-message";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import Pagination from "../../../../components/pagination/pagination";
import Params from "../../../../helpers/params";
import { setPage } from "../../../../store/pagination/slice";

import styles from "../../styles.module.scss";

const List = ({ offset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const { useTrademarksList, total, status, errorStatus } = useSelector(
    (state) => state.useTrademark
  );

  const deleteHandler = (id) => {
    dispatch(UseTrademarkAPI.remove(id));
    dispatch(setModalOpen(false));
  };

  const editHandler = (id) => {
    navigate(`edit/${id}`);
  };

  useEffect(() => {
    const params = { ...Params(20, offset * 20) };
    dispatch(UseTrademarkAPI.getAll(params));
  }, [dispatch, status, offset]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatusText(null) }],
      successMessage: "Հաջողությամբ հեռացված է ցանկից",
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <>
      {useTrademarksList?.length > 0 &&
        useTrademarksList.map((item) => (
          <div className={styles.list_item} key={item.id}>
            <div className={styles.list_item_name}>
              <p>{item.id}</p>.{" "}
              <div className={styles.item_inner}>
                <img
                  width={30}
                  height={30}
                  src={BASE_URL + item.image}
                  className={styles.use_trademark_img}
                  alt={item.armenian_name || "Trademark image"}
                />
                <p>{item.tm_or_ob}</p>/ {item.armenian_name} </div>
            </div>
            <PermissionGuard>
              <MenuButton>
                <MainButton
                  startIcon={<Edit />}
                  onClick={() => editHandler(item.id)}
                >
                  Փոխել
                </MainButton>
                <BasicModal
                  title="Ջնջել"
                  color="error"
                  startIcon={<Delete />}
                  modalId={`delete-modal-${item.id}`}
                >
                  <p>{DELETE_MESSAGE}</p>
                  <MainButton
                    color="error"
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() => deleteHandler(item.id)}
                  >
                    Ջնջել
                  </MainButton>
                </BasicModal>
              </MenuButton>
            </PermissionGuard>
          </div>
        ))}
      <Pagination total={total} offset={offset} />
    </>
  );
};

export default List;
