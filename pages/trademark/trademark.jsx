import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setClearErrorAction,
  setDeleteTradeMark,
  setOneTradeMark,
  setStatusText,
} from "../../store/trademark/slice";
import { setImageSlice } from "../../store/image/slice";
import { setModalOpen } from "../../store/modal/slice";
import { TradeMarkAPI } from "../../services/trademark";
import Params from "../../helpers/params";
import PageTitle from "../../components/page-title/page-title";
import Search from "../../components/search/search";
import Pagination from "../../components/pagination/pagination";
import useActionHandlers from "../../hooks/useActionHandlers";
import BasicModal from "../../components/modal/modal";
import DownloadFile from "./components/download-file/download-file";
import Filter from "./components/filter/filter";
import Item from "./components/item/item";
import { handleResponseStatus } from "../../utils/handle-response-status";
import CreateBtn from "../../components/create-btn/create-btn";
import { setPage } from "../../store/pagination/slice";

import styles from "./styles.module.scss";

const TradeMark = () => {
  const dispatch = useDispatch();

  const { status, errorStatus, list, total, filter } = useSelector(
    (state) => state.tradeMark
  );
  const { offset } = useSelector((state) => state.pagination);

  const actions = useActionHandlers("TM", TradeMarkAPI, {
    setDeletedEntityId: setDeleteTradeMark,
    setModalOpen,
    deleteEntity: "deleteTradeMark",
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      trade_mark_name: "",
    },
  });

  const handleSearch = handleSubmit((data) => {
    const params = { ...Params(20, offset), ...data };
    dispatch(TradeMarkAPI.getTradeMarks(params));
  });

  useEffect(() => {
    if (filter) {
      const paramsWithFilter = { ...filter, ...Params(20, offset * 20) };
      dispatch(TradeMarkAPI.getTradeMarks(paramsWithFilter));
    } else {
      dispatch(TradeMarkAPI.getTradeMarks(Params(20, offset * 20)));
    }

    dispatch(setOneTradeMark(null));
  }, [dispatch, status, offset, filter]);

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
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Ապրանքային նշան" />
      <div className={styles.top_block}>
        <CreateBtn
          onClick={actions.create}
          className={styles.btn_create}
          text="Ավելացնել նոր ապրանքային նշան"
        />
        <Search
          control={control}
          name="trade_mark_name"
          onSearch={handleSearch}
          className={styles.search}
        />
        <div>
          <div>
            <BasicModal
              title="Ֆիլտր"
              variant="outlined"
              modalId="thirdModal"
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
                alt="pdf"
                src={`${process.env.PUBLIC_URL}/icons/pdf.svg`}
              />
            }
          >
            <DownloadFile modalId="secondModal" offset={offset} />
          </BasicModal>
        </div>
      </div>
      {list?.length ? (
        list.map((item) => <Item item={item} key={item.id} actions={actions} />)
      ) : (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      )}
      <Pagination offset={offset} total={total} />
    </>
  );
};

export default TradeMark;
