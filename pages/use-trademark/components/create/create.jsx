import { useDispatch, useSelector } from "react-redux";
import MainSelect from "../../../../components/main-select/main-select";
import { useForm } from "react-hook-form";
import { SelectOption } from "../../../../utils/select-options";
import { transformData } from "../../../../utils/transform-data";
import { useEffect } from "react";
import { CityAPI } from "../../../../services/city";
import { UseTrademarkAPI } from "../../../../services/use-trademark";
import MainButton from "../../../../components/button/button";
import { OperationsAPI } from "../../../../services/operations";
import FileAdd from "../../../../components/forms/use-trademark/add-file";
import { Add } from "@mui/icons-material";
import PageTitle from "../../../../components/page-title/page-title";
import Back from "../../../../components/back-btn/back-btn";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { useNavigate } from "react-router-dom";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/use-trademark/slice";

import styles from "../../styles.module.scss";

const CreateUseTrademark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const { list } = useSelector((state) => state.city);
  const { listFile } = useSelector((state) => state.file);
  const { status, errorStatus } = useSelector((state) => state.useTrademark);
  const { trademarkObjectionList } = useSelector((state) => state.operations);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      tm_or_ob: "",
      country: "",
      upload_file: "",
    },
  });

  const currentObjectionTrademark = watch("tm_or_ob");
  const currentObjectionTrademarkImg = trademarkObjectionList.find(
    (item) => item.id === currentObjectionTrademark
  );

  const optionsCity = SelectOption(list);
  const trademarksObjectionOptions = transformData(
    trademarkObjectionList,
    true
  );

  const onSubmit = handleSubmit((data) => {
    if (Array.isArray(data.upload_file)) {
      data.upload_file = data.upload_file.map((item, index) => {
        const file = listFile[index]?.file || null;
        return {
          ...item,
          file: file,
        };
      });
    }
    dispatch(UseTrademarkAPI.create(data));
  });

  useEffect(() => {
    dispatch(CityAPI.getCities());
    dispatch(OperationsAPI.getTrademarkObjectionList());
  }, [dispatch]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatusText(null) }],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/use-trademark",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <>
      <Back />
      <PageTitle title="Ավելացնել նոր ապրանքային նշանի օգտագործում" />
      <MainSelect
        name="tm_or_ob"
        isFormatOptions
        control={control}
        options={trademarksObjectionOptions}
        placeholder="Ապրանքանիշ / Առարկություն"
        className={styles.ues_trademark_select}
      />
      {currentObjectionTrademarkImg?.image && (
        <img
          width={130}
          height={190}
          alt={currentObjectionTrademarkImg?.name}
          src={BASE_URL + currentObjectionTrademarkImg?.image}
          className={styles.use_trademark_img}
        />
      )}
      <br />
      <MainSelect
        name="country"
        control={control}
        placeholder="Երկիր"
        options={optionsCity}
        className={styles.ues_trademark_select}
      />
      <br />
      <FileAdd control={control} name="upload_file" url="use-trade-mark" />
      <MainButton
        type="submit"
        onClick={onSubmit}
        variant="contained"
        startIcon={<Add />}
      >
        Ստեղծել
      </MainButton>
    </>
  );
};

export default CreateUseTrademark;
