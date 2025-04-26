import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import { CityAPI } from "../../services/city";
import { setDeleteCity, setLists, setStatusText } from "../../store/city/slice";
import { setImageSlice } from "../../store/image/slice";
import { setModalOpen } from "../../store/modal/slice";
import MainButton from "../../components/button/button";
import BasicModal from "../../components/modal/modal";
import MenuButton from "../../components/menu-button/menu-button";
import Pagination from "../../components/pagination/pagination";
import PageTitle from "../../components/page-title/page-title";
import { DELETE_MESSAGE } from "../../constant/delete-message";
import Params from "../../helpers/params";
import CreateCity from "./components/create/create";
import Back from "../../components/back-btn/back-btn";
import { setPage } from "../../store/pagination/slice";
import PermissionGuard from "../../hoc/permission-guard/permission-guard";

import styles from "./styles.module.scss";

const City = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { offset } = useSelector((state) => state.pagination);
  const { status, list, total } = useSelector((state) => state.city);

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  useEffect(() => {
    dispatch(CityAPI.getCities(Params(20, offset * 20)));
    dispatch(setImageSlice(null));
    dispatch(setStatusText(null));
  }, [dispatch, status, offset]);

  useEffect(() => {
    dispatch(setPage(0));
    dispatch(setLists([]));
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(CityAPI.deleteCity(id));
    dispatch(setDeleteCity(id));
    dispatch(setModalOpen(false));
  };

  const editHandler = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <Back />
      <PageTitle title="Երկրներ" className={styles.title} />
      <PermissionGuard>
        <CreateCity />
      </PermissionGuard>

      {list?.length ? (
        list.map((item, i) => (
          <div key={item.id} className={styles.list}>
            <div className={styles.info}>
              <div>{offset * 20 + i + 1}</div>
              <img
                alt={item.name}
                className={styles.img}
                src={
                  item?.image
                    ? `${BASE_URL}${item?.image}`
                    : `${process.env.PUBLIC_URL}/images/no-image.svg`
                }
              />
              <div>{item.name}</div>
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
        ))
      ) : (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      )}
      <Pagination offset={offset} total={total} />
    </>
  );
};

export default City;
