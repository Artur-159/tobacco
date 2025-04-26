import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import FileAdd from "../../../../components/forms/use-trademark/add-file";
import MainSelect from "../../../../components/main-select/main-select";
import PageTitle from "../../../../components/page-title/page-title";
import { Edit } from "@mui/icons-material";
import { UseTrademarkAPI } from "../../../../services/use-trademark";
import { SelectOption } from "../../../../utils/select-options";
import { transformData } from "../../../../utils/transform-data";
import { OperationsAPI } from "../../../../services/operations";
import { CityAPI } from "../../../../services/city";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/use-trademark/slice";

import styles from "../../styles.module.scss";

const EditUseTrademark = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const { oneUseTrademark, status, errorStatus } = useSelector(
    (state) => state.useTrademark
  );
  const { list } = useSelector((state) => state.city);
  const { listFile } = useSelector((state) => state.file);
  const { trademarkObjectionList } = useSelector((state) => state.operations);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      ...oneUseTrademark,
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

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {
      ...data,
      upload_file: data.upload_file.map((item, index) => {
        const file = listFile[index]?.file || item.file;
        return { ...item, file };
      }),
    };
    try {
      await dispatch(UseTrademarkAPI.update(updatedData)).unwrap();
    } catch (error) {
      console.error("Update failed:", error);
    }
  });

  useEffect(() => {
    dispatch(UseTrademarkAPI.getOne(id));
    dispatch(CityAPI.getCities());
    dispatch(OperationsAPI.getTrademarkObjectionList());
  }, [dispatch, id]);

  useEffect(() => {
    if (oneUseTrademark) {
      reset(oneUseTrademark);
    }
  }, [reset, oneUseTrademark]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatusText(null) }],
      successMessage: "Տվյալները հաջողությամբ փոփոխված են",
      navigatePath: "/use-trademark",
      navigate,
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <>
      <Back />
      <PageTitle title="Փոխել տվյալները" />
      <MainSelect
        name="tm_or_ob"
        isFormatOptions
        control={control}
        options={trademarksObjectionOptions}
        placeholder="Ապրանքանիշ / Առարկություն"
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
      <MainSelect
        name="country"
        control={control}
        placeholder="երկիր"
        options={optionsCity}
      />
      <br />
      <FileAdd control={control} name="upload_file" url="use-trade-mark" />
      <MainButton
        type="submit"
        onClick={onSubmit}
        variant="contained"
        startIcon={<Edit />}
      >
        Փոխել տվյալները
      </MainButton>
    </>
  );
};

export default EditUseTrademark;
