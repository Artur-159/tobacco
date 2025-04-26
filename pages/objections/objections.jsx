import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ObjectionsAPI } from "../../services/objections";
import { setModalOpen } from "../../store/modal/slice";
import { setObjectionId } from "../../store/objections/slice";
import Params from "../../helpers/params";
import { setPage } from "../../store/pagination/slice";
import { setImageSlice } from "../../store/image/slice";
import useActionHandlers from "../../hooks/useActionHandlers";
import Search from "../../components/search/search";
import BasicModal from "../../components/modal/modal";
import PageTitle from "../../components/page-title/page-title";
import DownloadFile from "./components/download-file/download-file";
import Pagination from "../../components/pagination/pagination";
import CreateBtn from "../../components/create-btn/create-btn";
import List from "./components/list/list";
import Filter from "./components/filter/filter";

import styles from "./styles.module.scss";

const Objections = () => {
  const dispatch = useDispatch();

  const { offset } = useSelector((state) => state.pagination);
  const { total, filter } = useSelector((state) => state.objections);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const ACTION_HANDLERS = useActionHandlers("OB", ObjectionsAPI, {
    setDeletedEntityId: setObjectionId,
    setModalOpen,
    deleteEntity: "deleteObjection",
  });

  const handleSearch = handleSubmit((data) => {
    const params = { ...Params(20, offset), ...data };
    dispatch(ObjectionsAPI.getObjections(params));
  });

  useEffect(() => {
    dispatch(setPage(0));
    dispatch(setImageSlice(null));
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      const paramsWithFilter = { ...filter, ...Params(20, offset * 20) };
      dispatch(ObjectionsAPI.getObjections(paramsWithFilter));
    } else {
      dispatch(ObjectionsAPI.getObjections(Params(20, offset * 20)));
    }
  }, [offset, filter, dispatch]);

  return (
    <>
      <PageTitle title="Առարկություններ" />
      <div className={styles.top_bar}>
        <CreateBtn
          className={styles.btn_create}
          text="Գրանցել նոր առարկություն"
          onClick={ACTION_HANDLERS.create}
        />
        <Search
          control={control}
          name="search"
          className={styles.search}
          onSearch={handleSearch}
        />
        <div>
          <div>
            <BasicModal
              modalId="thirdModal"
              title="Ֆիլտր"
              variant="outlined"
              className={styles.filter_modal}
            >
              <Filter offset={offset} modalId="thirdModal" />
            </BasicModal>
          </div>
        </div>
        <div className={styles.modal}>
          <BasicModal
            title="Արտածել PDF"
            variant="outlined"
            modalId="secondModal"
            startIcon={
              <img
                width={20}
                height={20}
                alt="pdf Icon"
                src={`${process.env.PUBLIC_URL}/icons/pdf.svg`}
              />
            }
          >
            <DownloadFile modalId="secondModal" offset={offset} />
          </BasicModal>
        </div>
      </div>
      <List actions={ACTION_HANDLERS} />
      <Pagination offset={offset} total={total} />
    </>
  );
};

export default Objections;
