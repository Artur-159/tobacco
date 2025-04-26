import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { CityAPI } from "../../../../services/city";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/city/slice";
import { setImageSlice } from "../../../../store/image/slice";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import Media from "../../../../components/uploads/image/image";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles.module.scss";

const CreateCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, errorStatus } = useSelector((state) => state.city);
  const { image } = useSelector((state) => state.image);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      country_code: "",
      image: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image = image;
    dispatch(CityAPI.postCity(data));
    reset();
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImageSlice(null) },
      ],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <div className={styles.create_service}>
        <div className={styles.img_slc_inp}>
          <TextInput
            control={control}
            name="country_code"
            placeholder="Երկրի կոդը"
            error={errors.country_code?.message}
            size="small"
          />
          <TextInput
            control={control}
            name="name"
            error={errors.name?.message}
            placeholder="Երկիր"
            size="small"
          />
          <Media
            name="image"
            status={status}
            control={control}
            image={image && image}
            className={styles.city_img}
            error={errors.image?.message}
          />
        </div>

        <MainButton
          onClick={onSubmit}
          variant="contained"
          startIcon={<AddIcon />}
          className={styles.btn_create}
        >
          Ավելացնել
        </MainButton>
      </div>
    </div>
  );
};

export default CreateCity;
