import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTransformedOptions } from "../../hooks/useTransformedOptions";
import MainSelect from "../main-select/main-select";
import MainButton from "../button/button";
import { AttachCountryAPI } from "../../services/attach-country";
import { useGetAttachData } from "../../hooks/useGetAttachData";
import { handleResponseStatus } from "../../utils/handle-response-status";
import {
  setClearErrorAction,
  setStatusText,
} from "../../store/attach-country/slice";

import styles from "./styles.module.scss";

const AttachCountry = () => {
  const { id } = useParams();
  const location = useLocation();
  const entityRoute = location.pathname.split("/")[1];

  const { list } = useSelector((state) => state.city);
  const { oneTradeMark } = useSelector((state) => state.tradeMark);
  const { oneObjection } = useSelector((state) => state.objections);
  const { decision_docs } = useSelector((state) => state.ledgerDocs);
  const { status, errorStatus } = useSelector((state) => state.attachCountry);

  useGetAttachData(entityRoute, id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const entityList = useMemo(
    () => (entityRoute === "trademark" ? oneTradeMark : oneObjection),
    [oneTradeMark, oneObjection, entityRoute]
  );

  const { optionsCities, transformedData, optionsEntity } =
    useTransformedOptions(decision_docs, entityList, list);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      country: "",
      ledger_doc: "",
      trade_mark: null,
    },
  });

  useEffect(() => {
    if (optionsEntity) {
      setValue("trade_mark", optionsEntity.value);
    }
  }, [optionsEntity, setValue]);

  const onSubmit = (data) => {
    data[entityRoute === "trademark" ? "trade_mark_id" : "objection"] = +id;
    entityRoute === "trademark"
      ? dispatch(AttachCountryAPI.postAttachCountryTradeMark(data))
      : dispatch(AttachCountryAPI.postAttachCountryObjection(data));
  };

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatusText(false) }],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      navigate,
      navigatePath:
        entityRoute === "trademark"
          ? `/trademark/detail/${id}`
          : `/objections/detail/${id}`,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate, entityRoute, id]);

  return (
    <div className={styles.country_form}>
      <h1 className={styles.title}>Ավելացնել / Կցել երկիր </h1>
      <div>
        {optionsEntity && (
          <MainSelect
            name="trade_mark"
            control={control}
            options={[optionsEntity]}
            isDisabled={true}
          />
        )}
      </div>
      <div>
        <MainSelect
          name="country"
          control={control}
          options={optionsCities}
          className={styles.select}
          placeholder={"Երկիր *"}
        />
        <span className={styles.text}>Գրանցման կամ մերժման որոշում</span>
        <MainSelect
          name="ledger_doc"
          control={control}
          options={transformedData}
          className={styles.select}
          placeholder={"Փաստաթուղթ"}
        />
      </div>
      <MainButton
        type="submit"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Հաստատել
      </MainButton>
    </div>
  );
};

export default AttachCountry;
