import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../../store/operation-types/slice";
import { OperationTypesAPI } from "../../../../services/operation-types";
import BasicModal from "../../../../components/modal/modal";
import MainButton from "../../../../components/button/button";
import { Delete } from "@mui/icons-material";
import { DELETE_MESSAGE } from "../../../../constant/delete-message";
import Toast from "../../../../helpers/status-text";
import { setModalOpen } from "../../../../store/modal/slice";

import styles from "./styles.module.scss";

const List = () => {
  const dispatch = useDispatch();

  const { status, list } = useSelector((state) => state.operationTypes);

  const deleteHandler = (id, modalId) => {
    dispatch(OperationTypesAPI.deleteOperationType(id))
      .unwrap()
      .then(() => {
        dispatch(OperationTypesAPI.getOperationTypes());
        Toast.success("Հաջողությամբ հեռացված է ցանկից");
      })
      .catch((error) => {
        console.error("error", error);
      });
    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  useEffect(() => {
    dispatch(OperationTypesAPI.getOperationTypes());
    dispatch(setStatus(null));
  }, [dispatch, status]);

  return (
    <div className={styles.list}>
      {list?.map(({ id, operation_type }, i) => (
        <div key={id} className={styles.list_item}>
          <p>
            {i + 1}. {operation_type}
          </p>
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
              onClick={() => deleteHandler(id, `delete-modal-${id}`)}
            >
              Ջնջել
            </MainButton>
          </BasicModal>
        </div>
      ))}
    </div>
  );
};

export default List;
