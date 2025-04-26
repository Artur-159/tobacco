import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { validation } from "../validation/validation";
import { CompanyAPI } from "../../../../services/company";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/company/slice";
import { setImageSlice } from "../../../../store/image/slice";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import CompanyForm from "../../../../components/forms/company-form/form";
import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../../../../components/page-title/page-title";
import FileInputRow from "../../../../components/forms/company-form/add-file";

import styles from "../../styles.module.scss";

const EditCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image } = useSelector((state) => state.image);
  const { listFile } = useSelector((state) => state.file);
  const { status, errorStatus, oneCompany } = useSelector(
    (state) => state.company
  );

  let defaultValues = { ...oneCompany };

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
    dispatch(CompanyAPI.getOneCompany(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(oneCompany);
    dispatch(setImageSlice(oneCompany?.image));
  }, [reset, dispatch, oneCompany]);

  const onSubmit = handleSubmit((data) => {
    data.phones = data.phones.filter(
      (item) => item && !item.value && typeof item !== "object"
    );
    if (Array.isArray(data.upload_file)) {
      data.upload_file = data.upload_file.map((item, index) => {
        const file = listFile[index]?.file || null;
        return {
          ...item,
          file: file,
          file_select_type: item.file_select_type,
        };
      });
    }
    data.image = image;
    dispatch(CompanyAPI.putUpdateCompany(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImageSlice(null) },
      ],
      successMessage: "Տվյալները հաջողությամբ փոփոխված են",
      errorMessage: errorStatus,
      navigate,
      navigatePath: "/company",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Փոխել կազմակերպության տվյալները" />

      <div className={styles.create_service}>
        <CompanyForm control={control} errors={errors} image={image} />
        <FileInputRow
          control={control}
          name="upload_file"
          url="partner-companies"
        />
        <div className={styles.btn}>
          <MainButton
            type="submit"
            variant="contained"
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
