import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setClearErrorAction,
  setDeletePartner,
  setOnePartner,
  setStatusText,
} from "../../store/partner/slice";
import { setImageSlice } from "../../store/image/slice";
import { setModalOpen } from "../../store/modal/slice";
import { PartnerAPI } from "../../services/partner";
import params from "../../helpers/params";
import Search from "../../components/search/search";
import Pagination from "../../components/pagination/pagination";
import Item from "./components/item/Item";
import PageTitle from "../../components/page-title/page-title";
import useActionHandlers from "../../hooks/useActionHandlers";
import { handleResponseStatus } from "../../utils/handle-response-status";
import CreateBtn from "../../components/create-btn/create-btn";

import styles from "./styles.module.scss";

const PartnerAuthorized = () => {
  const dispatch = useDispatch();

  const { status, authorizes, authorizes_total, errorStatus } = useSelector(
    (state) => state.partner
  );
  const { offset } = useSelector((state) => state.pagination);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      company_is: "authorized",
    },
  });

  const ACTION_HANDLERS = useActionHandlers("", PartnerAPI, {
    setDeletedEntityId: setDeletePartner,
    setModalOpen,
    deleteEntity: "deletePartner",
  });

  useEffect(() => {
    dispatch(
      PartnerAPI.getPartnersAuthorized({
        company_is: "authorized",
        ...params(20, offset * 20),
      })
    )
      .unwrap()
      .catch((error) => console.error("API error:", error));

    dispatch(setOnePartner(null));
  }, [dispatch, status, offset]);

  const handleSearch = handleSubmit((data) => {
    dispatch(PartnerAPI.getPartnersAuthorized({ ...data, ...params() }));
  });

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
    dispatch(setImageSlice(null));
  }, [dispatch]);

  return (
    <div>
      <PageTitle title="Գործընկերներ" />
      <div className={styles.top_bar}>
        <CreateBtn
          className={styles.btn_create}
          onClick={ACTION_HANDLERS.create}
          text="Ավելացնել նոր կազմակերպություն"
        />
        <Search
          control={control}
          name="search"
          onSearch={handleSearch}
          className={styles.search}
        />
      </div>
      <div>
        {authorizes?.length ? (
          authorizes.map((item) => (
            <Item item={item} key={item.id} actions={ACTION_HANDLERS} />
          ))
        ) : (
          <h4>Այս պահին ցանկը դատարկ է</h4>
        )}
      </div>
      <Pagination offset={offset} total={authorizes_total} />
    </div>
  );
};

export default PartnerAuthorized;
