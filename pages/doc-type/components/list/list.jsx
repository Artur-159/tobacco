import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../../../store/doc-types/slice";
import { setModalOpen } from "../../../../store/modal/slice";
import { DocTypeAPI } from "../../../../services/doc-type";
import BasicModal from "../../../../components/modal/modal";
import MainButton from "../../../../components/button/button";
import { Delete } from "@mui/icons-material";
import Toast from "../../../../helpers/status-text";

import styles from "./styles.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.docType);

  const deleteHandler = (id, modalId) => {
    dispatch(DocTypeAPI.deleteDocType(id))
      .unwrap()
      .then(() => {
        dispatch(setId(id));
        Toast.success("Հաջողությամբ հեռացված է ցանկից");
      })
      .catch((error) => {
        console.error("error", error);
      });
    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  return (
    <div className={styles.list}>
      {list?.length ? (
        list.map((item, i) => (
          <div key={item.id} className={styles.list_item}>
            <p>
              {i + 1}. {item.doc_type}
            </p>
            <BasicModal
              title="Ջնջել"
              color="error"
              startIcon={<Delete />}
              modalId={`delete-modal-${item.id}`}
            >
              <p>
                Համոզվա՞ծ եք, որ ցանկանում եք շարունակել այս գործողությունը: Այն
                հնարավոր չէ վերականգնել:
              </p>
              <MainButton
                color="error"
                variant="contained"
                startIcon={<Delete />}
                onClick={() =>
                  deleteHandler(item.id, `delete-modal-${item.id}`)
                }
              >
                Ջնջել
              </MainButton>
            </BasicModal>
          </div>
        ))
      ) : (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      )}
    </div>
  );
};

export default List;
