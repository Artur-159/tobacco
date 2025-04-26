import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import {
  setClearErrorAction,
  setOneCity,
  setStatusText,
} from "../../../../store/city/slice";
import { setImageSlice } from "../../../../store/image/slice";
import { CityAPI } from "../../../../services/city";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import Media from "../../../../components/uploads/image/image";
import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../../../../components/page-title/page-title";

import styles from "../../styles.module.scss";

const EditCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, errorStatus, oneCity } = useSelector((state) => state.city);
  const { image } = useSelector((state) => state.image);

  let defaultValues = { ...oneCity };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    ...defaultValues,
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    dispatch(CityAPI.getOneCity(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneCity);
    dispatch(setImageSlice(oneCity?.image));
  }, [reset, dispatch, oneCity]);

  const onSubmit = handleSubmit((data) => {
    data.image = image;
    dispatch(CityAPI.putUpdateCity(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImageSlice(null) },
        { action: dispatch, payload: setOneCity(null) },
      ],
      successMessage: "Տվյալները հաջողությամբ փոփոխված են",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/city",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Փոխել տվյալները" />
      <div className={styles.create_service}>
        <div className={styles.img_slc_inp}>
          <TextInput
            control={control}
            name={"name"}
            error={!!errors.name}
            placeholder={"Երկիր"}
          />
          <TextInput
            control={control}
            name="country_code"
            placeholder="Երկրի կոդը"
            error={errors.country_code?.message}
          />
          <Media
            status={status}
            image={image && image}
            name="image"
            control={control}
            error={errors.image?.message}
            className={styles.city_img}
          />
        </div>

        <MainButton
          variant={"contained"}
          onClick={onSubmit}
          className={styles.btn_create}
          startIcon={<EditIcon />}
        >
          Փոխել տվյալները
        </MainButton>
      </div>
    </div>
  );
};

export default EditCity;
