import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEntityData } from "../../hooks/useEntityData";
import { useTransformedOptions } from "../../hooks/useTransformedOptions";
import MainSelect from "../../components/main-select/main-select";
import MainButton from "../../components/button/button";
import { AttachCountryAPI } from "../../services/attach-country";
import { handleResponseStatus } from "../../utils/handle-response-status";
import {
  setClearErrorAction,
  setStatusText,
} from "../../store/attach-country/slice";

import styles from "./styles.module.scss";

const EditAttachCountry = () => {
  const { id } = useParams();
  const location = useLocation();
  const entityRoute = location.pathname.split("/")[1];
  const getEditData = location.pathname.split("/")[2];

  const { list } = useSelector((state) => state.city);
  const { oneTradeMark } = useSelector((state) => state.tradeMark);
  const { oneObjection } = useSelector((state) => state.objections);
  const { decision_docs } = useSelector((state) => state.ledgerDocs);
  const { status, errorStatus, oneAttachTradeMark, oneAttachObjection } =
    useSelector((state) => state.attachCountry);

  const EditDataId = getEditData
    ? oneAttachTradeMark?.trade_mark.id
    : oneAttachObjection?.trade_mark.id; //check key in Objection data

  const tradeMarkID = getEditData
    ? oneAttachTradeMark?.trade_mark.id
    : oneAttachObjection?.trade_mark.id;

  useEntityData(entityRoute, getEditData, EditDataId, tradeMarkID, id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const entityList = useMemo(
    () => (entityRoute === "trademark" ? oneTradeMark : oneObjection),
    [oneTradeMark, oneObjection, entityRoute]
  );

  const { optionsCities, transformedData, optionsEntity } =
    useTransformedOptions(decision_docs, entityList, list);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      country: "",
      ledger_doc: "",
      trade_mark: null,
    },
  });

  useEffect(() => {
    if ((oneAttachTradeMark || oneAttachObjection) && optionsEntity) {
      reset((prev) => ({
        ...prev,
        country:
          oneAttachTradeMark?.country?.id ||
          oneAttachObjection?.country?.id ||
          prev.country,
        ledger_doc:
          oneAttachTradeMark?.ledger_doc?.id ||
          oneAttachObjection?.ledger_doc?.id ||
          prev.ledger_doc,
        trade_mark: optionsEntity.value || prev.trade_mark,
      }));
    }
  }, [oneAttachTradeMark, oneAttachObjection, optionsEntity, reset]);

  const onSubmit = (data) => {
    data[entityRoute === "trademark" ? "trade_mark_id" : "objection"] = +id;
    entityRoute === "trademark"
      ? dispatch(AttachCountryAPI.putOneAttachTradeMark({ ...data }))
      : dispatch(AttachCountryAPI.putOneAttachObjection(data));
  };

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatusText(false) }],
      successMessage: "Հաջողությամբ փոփոխված է",
      errorMessage: errorStatus,
      navigate,
      navigatePath:
        entityRoute === "trademark"
          ? `/trademark/detail/${oneAttachTradeMark?.trade_mark.id}`
          : `/objections/detail/${oneAttachObjection?.objection}`,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [
    status,
    errorStatus,
    dispatch,
    navigate,
    entityRoute,
    id,
    oneAttachObjection?.objection,
    oneAttachTradeMark?.trade_mark.id,
  ]);

  return (
    <div className={styles.country_form}>
      <h1 className={styles.title}>Փոխել կցված երկրի տվյալները </h1>
      <div>
        {optionsEntity && (
          <MainSelect
            name="trade_mark"
            control={control}
            options={optionsEntity ? [optionsEntity] : []}
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

export default EditAttachCountry;
