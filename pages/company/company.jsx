import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClearErrorAction,
  setDeleteCompany,
  setOneCompany,
  setStatusText,
} from "../../store/company/slice";
import { setImageSlice } from "../../store/image/slice";
import { setModalOpen } from "../../store/modal/slice";
import { CompanyAPI } from "../../services/company";
import params from "../../helpers/params";
import Pagination from "../../components/pagination/pagination";
import Item from "./components/item/Item";
import PageTitle from "../../components/page-title/page-title";
import useActionHandlers from "../../hooks/useActionHandlers";
import { handleResponseStatus } from "../../utils/handle-response-status";
import { setPage } from "../../store/pagination/slice";
import CreateBtn from "../../components/create-btn/create-btn";

import styles from "./styles.module.scss";

const Company = () => {
  const dispatch = useDispatch();

  const ACTION_HANDLERS = useActionHandlers("", CompanyAPI, {
    setDeletedEntityId: setDeleteCompany,
    setModalOpen,
    deleteEntity: "deleteCompany",
  });

  const { status, errorStatus, list, total } = useSelector(
    (state) => state.company
  );
  const { offset } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(CompanyAPI.getCompanies(params(20, offset * 20)));
    dispatch(setOneCompany(null));
  }, [dispatch, status, offset]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImageSlice(null) },
      ],
      successMessage: "Հաջողությամբ հեռացված է ցանկից",
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch]);

  useEffect(() => {
    dispatch(setPage(0));
    dispatch(setImageSlice(null));
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Իմ ընկերությունները" />

      <CreateBtn
        className={styles.btn_create}
        text="Ավելացնել նոր ընկերություն"
        onClick={ACTION_HANDLERS.create}
      />

      <div>
        {list?.length ? (
          list.map((item) => (
            <Item item={item} key={item.id} actions={ACTION_HANDLERS} />
          ))
        ) : (
          <h4>Այս պահին ցանկը դատարկ է</h4>
        )}
      </div>
      <Pagination offset={offset} total={total} />
    </>
  );
};

export default Company;
