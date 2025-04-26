import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { setImageSlice } from "../../../../store/image/slice";
import { TradeMarkAPI } from "../../../../services/trademark";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import PageTitle from "../../../../components/page-title/page-title";
import Form from "../../../../components/forms/trademark-form/form";
import AddSelect from "../../../../components/forms/trademark-form/add-select";
import EditIcon from "@mui/icons-material/Edit";
import { setStatusText } from "../../../../store/trademark/slice";

import styles from "../../styles.module.scss";

const EditCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { image } = useSelector((state) => state.image);
  const { status, oneTradeMark } = useSelector((state) => state.tradeMark);

  let defaultValues = { ...oneTradeMark };

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
    dispatch(TradeMarkAPI.getOneTradeMark(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(oneTradeMark);
    dispatch(setImageSlice(oneTradeMark?.image_path));
  }, [reset, dispatch, oneTradeMark]);

  const onSubmit = handleSubmit((data) => {
    data.classes = data.classes
      .filter((item) => item && (item.class_id || item.value))
      .map((item) => {
        const newItem = { ...item };
        delete newItem.name;
        return newItem;
      });

    if (data.classes.length === 0) data.classes = null;

    data.owner = data?.owner?.id;
    data.image_path = image;
    dispatch(TradeMarkAPI.putUpdateTradeMark(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Տվյալները հաջողությամբ փոփոխված են", false, {
        onClose: () => {
          dispatch(setStatusText(null));
          navigate("/trademark");
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Փոխել ապրանքանիշի տվյալները" />

      <div className={styles.create_service}>
        <Form control={control} path={image} errors={errors} />
        <AddSelect control={control} name="classes" />

        <div className={styles.btn}>
          <MainButton
            variant="contained"
            type="submit"
            className={styles.btn}
            onClick={onSubmit}
            startIcon={<EditIcon className={styles.btn_icon} />}
          >
            Փոխել տվյալները
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
