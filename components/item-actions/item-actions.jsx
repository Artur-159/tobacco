import MainButton from "../button/button";
import BasicModal from "../modal/modal";
import MenuButton from "../menu-button/menu-button";
import {
  Edit,
  Delete,
  InsertDriveFile,
  InfoOutlined,
} from "@mui/icons-material";
import { DELETE_MESSAGE } from "../../constant/delete-message";
import PermissionGuard from "../../hoc/permission-guard/permission-guard";

import styles from "./styles.module.scss";

const ItemActions = ({
  id,
  handlers,
  className,
  showDetail = false,
  showLedgerDocs = false,
  showOperations = false,
}) => {
  const {
    edit,
    delete: deleteAction,
    navigateToDetail,
    navigateToLedgerDocs,
    navigateToOperations,
  } = handlers;

  return (
    <MenuButton className={className}>
      <PermissionGuard>
        <MainButton startIcon={<Edit />} onClick={() => edit(id)}>
          Փոխել
        </MainButton>
      </PermissionGuard>
      {showLedgerDocs && (
        <MainButton
          startIcon={<InsertDriveFile />}
          onClick={() => navigateToLedgerDocs(id)}
        >
          Նոր փաստաթուղթ
        </MainButton>
      )}
      {showOperations && (
        <MainButton
          startIcon={<InsertDriveFile />}
          onClick={() => navigateToOperations(id)}
        >
          Գործառնություններ
        </MainButton>
      )}
      {showDetail && (
        <MainButton
          startIcon={<InfoOutlined />}
          onClick={() => navigateToDetail(id)}
        >
          Մանրամասներ
        </MainButton>
      )}
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
            className={styles.delete_btn}
            onClick={() => deleteAction(id)}
          >
            Ջնջել
          </MainButton>
        </BasicModal>
      </PermissionGuard>
    </MenuButton>
  );
};

export default ItemActions;
