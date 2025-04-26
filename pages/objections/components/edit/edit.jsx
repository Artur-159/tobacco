import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { setErrorStatus, setStatus } from "../../../../store/objections/slice";
import { ObjectionsAPI } from "../../../../services/objections";
import { setImageSlice } from "../../../../store/image/slice";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import ObjectionsForm from "../../../../components/forms/objection-form/objection-form";
import PageTitle from "../../../../components/page-title/page-title";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../../styles.module.scss";

const EditObjection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { image } = useSelector((state) => state.image);
  const { status, oneObjection, errorStatus } = useSelector(
    (state) => state.objections
  );

  const defaultValues = { ...oneObjection };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    dispatch(ObjectionsAPI.getObjection(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(oneObjection);
    dispatch(setImageSlice(oneObjection?.image_upload));
  }, [reset, dispatch, oneObjection]);

  const onSubmit = handleSubmit((data) => {
    data.image_upload = image;
    dispatch(ObjectionsAPI.putObjection(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatus(false) },
        { action: dispatch, payload: setImageSlice("") },
      ],
      successMessage: "Տվյալները հաջողությամբ փոփոխված են",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/objections",
      clearErrorAction: () => dispatch(setErrorStatus()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <>
      <Back />
      <PageTitle title="Փոխել առարկությունը" />

      <ObjectionsForm control={control} errors={errors} image={image} />

      <div className={styles.btn}>
        <MainButton
          type="submit"
          onClick={onSubmit}
          variant="contained"
          className={styles.btn}
          startIcon={<EditIcon />}
        >
          Փոխել տվյալները
        </MainButton>
      </div>
    </>
  );
};

export default EditObjection;
