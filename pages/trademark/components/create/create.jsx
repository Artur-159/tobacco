import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { TradeMarkAPI } from "../../../../services/trademark";
import { setImageSlice } from "../../../../store/image/slice";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/trademark/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import AddSelect from "../../../../components/forms/trademark-form/add-select";
import Form from "../../../../components/forms/trademark-form/form";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import PageTitle from "../../../../components/page-title/page-title";

import styles from "../../styles.module.scss";

const CreateTradeMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image } = useSelector((state) => state.image);
  const { status, errorStatus } = useSelector((state) => state.tradeMark);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      application_number: "",
      publication_date: "",
      publication_expiry: "",
      filling_date: "",
      registration_number: "",
      registration_date: "",
      registration_expiry_date: "",
      designation_date: "",
      designation_expired_date: "",
      rejection_date: "",
      rejection: "",
      termination_date: "",
      owner_id: "",
      representatives: "",
      trade_mark_name: "",
      trade_mark_armenian_name: "",
      image_path: "",
      types: "",
      classes: "",
      vienna_classification: "",
      description: "",
      add_select: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image_path = image;
    data.classes = data.classes.filter(
      (item) => item && (item.class_id || item.value)
    );

    if (data.classes.length === 0) data.classes = null;

    dispatch(TradeMarkAPI.postTradeMark(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImageSlice("") },
      ],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/trademark",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Գրանցել նոր ապրանքանիշ" />
      <div className={styles.create_service}>
        <Form control={control} path={image} errors={errors} />
        <AddSelect control={control} name="classes" />
        <div className={styles.btn}>
          <MainButton
            type="submit"
            onClick={onSubmit}
            variant="contained"
            startIcon={<AddIcon className={styles.btn_icon} />}
          >
            Ավելացնել
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default CreateTradeMark;
