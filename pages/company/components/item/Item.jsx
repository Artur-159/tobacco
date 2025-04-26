import { Link } from "react-router-dom";
import ItemActions from "../../../../components/item-actions/item-actions";
import { getDisplayValue } from "../../../../utils/get-display-value";

import styles from "../../styles.module.scss";

const Item = ({ item, actions }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;
  const { id, name, image, phones, email, website, city_name, address } = item;

  return (
    <div className={styles.list}>
      <div className={styles.info}>
        <div className={styles.number_name}>
          <Link to={`detail/${id}`} className={styles.name}>
            <p>{id}.</p>
            <p>{name}</p>
          </Link>
          <ItemActions
            id={id}
            showDetail
            handlers={actions}
            className={styles.menu}
          />
        </div>
        <Link to={`detail/${id}`}>
          <div className={styles.info_box}>
            <img
              width={180}
              height={180}
              alt={name}
              src={
                image
                  ? `${BASE_URL}${image}`
                  : `${process.env.PUBLIC_URL}/images/no-image.svg`
              }
              className={styles.info_img}
            />

            <div className={styles.info_content}>
              <div className={styles.box}>
                <h4>Հեռախոսահար</h4>
                <span>{getDisplayValue(phones?.join(", "))}</span>
              </div>
              <div className={styles.box}>
                <h4>Էլ-փոստ</h4>
                <span>{getDisplayValue(email)}</span>
              </div>
              <div className={styles.box}>
                <h4>Վեբ-կայք</h4>
                <span>{getDisplayValue(website)}</span>
              </div>
            </div>
            <div className={styles.info_content}>
              <div className={styles.box}>
                <h4>Երկիր</h4>
                <span>{getDisplayValue(city_name)}</span>
              </div>
              <div className={styles.box}>
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
