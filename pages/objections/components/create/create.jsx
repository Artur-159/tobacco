import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { setImageSlice } from "../../../../store/image/slice";
import { setErrorStatus, setStatus } from "../../../../store/objections/slice";
import { ObjectionsAPI } from "../../../../services/objections";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import ObjectionsForm from "../../../../components/forms/objection-form/objection-form";
import PageTitle from "../../../../components/page-title/page-title";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles.module.scss";

const CreateObjection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image } = useSelector((state) => state.image);
  const { status, errorStatus } = useSelector((state) => state.objections);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      application_number: "",
      filling_date: "",
      registration_number: "",
      registration_date: "",
      designation_expired_date: "",
      registrar: "",
      representatives: "",
      trade_mark_name: "",
      trade_mark_armenian_name: "",
      image_upload: "",
      description: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image_upload = image ? image : "";

    dispatch(ObjectionsAPI.postObjection(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatus(null) },
        { action: dispatch, payload: setImageSlice("") },
      ],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/objections",
      clearErrorAction: () => dispatch(setErrorStatus()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <>
      <Back />
      <PageTitle title="Գրանցել առարկություն" />
      <ObjectionsForm control={control} errors={errors} image={image} />

      <div className={styles.btn}>
        <MainButton
          type="submit"
          onClick={onSubmit}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Ավելացնել
        </MainButton>
      </div>
    </>
  );
};

export default CreateObjection;
