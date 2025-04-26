import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setClearErrorAction,
  setDeletePartner,
  setOnePartner,
  setStatusText,
} from "../../store/partner/slice";
import { setImageSlice } from "../../store/image/slice";
import { setModalOpen } from "../../store/modal/slice";
import { PartnerAPI } from "../../services/partner";
import Search from "../../components/search/search";
import Pagination from "../../components/pagination/pagination";
import Item from "./components/item/Item";
import Params from "../../helpers/params";
import PageTitle from "../../components/page-title/page-title";
import useActionHandlers from "../../hooks/useActionHandlers";
import { handleResponseStatus } from "../../utils/handle-response-status";
import CreateBtn from "../../components/create-btn/create-btn";

import styles from "./styles.module.scss";

const PartnerApplicant = () => {
  const dispatch = useDispatch();

  const { status, applicants, applicants_total, errorStatus } = useSelector(
    (state) => state.partner
  );
  const { offset } = useSelector((state) => state.pagination);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      company_is: "applicant",
    },
  });

  const ACTION_HANDLERS = useActionHandlers("", PartnerAPI, {
    setDeletedEntityId: setDeletePartner,
    setModalOpen,
    deleteEntity: "deletePartner",
  });

  const handleSearch = handleSubmit((data) => {
    dispatch(PartnerAPI.getPartnersApplicant({ ...data, ...Params() }));
  });

  useEffect(() => {
    dispatch(
      PartnerAPI.getPartnersApplicant({
        company_is: "applicant",
        ...Params(20, offset * 20),
      })
    );
    dispatch(setOnePartner(null));
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
    dispatch(setImageSlice(null));
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Հայտատու անձիք" />
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
        {applicants.length ? (
          applicants.map((item) => (
            <Item item={item} key={item.id} actions={ACTION_HANDLERS} />
          ))
        ) : (
          <h4>Այս պահին ցանկը դատարկ է</h4>
        )}
      </div>
      <Pagination offset={offset} total={applicants_total} />
    </>
  );
};

export default PartnerApplicant;
