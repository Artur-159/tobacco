import { Link } from "react-router-dom";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import MenuButton from "../../../../components/menu-button/menu-button";
import { Edit, Delete, InfoOutlined } from "@mui/icons-material";
import { DELETE_MESSAGE } from "../../../../constant/delete-message";
import { getDisplayValue } from "../../../../utils/get-display-value";
import PermissionGuard from "../../../../hoc/permission-guard/permission-guard";

import styles from "../../styles.module.scss";

const Item = ({ item, actions }) => {
  const { id, name, image, phones, email, website, city_name, address } = item;

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  return (
    <div key={id} className={styles.list}>
      <div className={styles.info}>
        <div className={styles.top_block}>
          <Link to={`detail/${id}`} className={styles.name}>
            <p className={styles.info_number}>{id}.</p>
            <p>{name}</p>
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
                  onClick={() => actions.delete(id)}
                >
                  Ջնջել
                </MainButton>
              </BasicModal>
            </PermissionGuard>
          </MenuButton>
        </div>
        <Link to={`detail/${id}`}>
          <div className={styles.info_box}>
            <img
              width={180}
              height={180}
              alt={name}
              className={styles.info_img}
              src={
                image
                  ? BASE_URL + image
                  : `${process.env.PUBLIC_URL}/images/no-image.svg`
              }
            />

            <div className={styles.info_block}>
              <div className={styles.box_info}>
                <h4>Հեռախոսահամար</h4>
                <span>{getDisplayValue(phones?.join(", "))}</span>
              </div>
              <div className={styles.box_info}>
                <h4>էլ. հասցե</h4>
                <span>{getDisplayValue(email)}</span>
              </div>
              <div className={styles.box_info}>
                <h4>Վեբ կայք</h4>
                <span>{getDisplayValue(website)}</span>
              </div>
            </div>
            <div className={styles.info_block}>
              <div className={styles.box_info}>
                <h4>Երկիր</h4>
                <span>{getDisplayValue(city_name)}</span>
              </div>
              <div className={styles.box_info}>
                <h4>Հասցե</h4>
                <span>{getDisplayValue(address)}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Item;
