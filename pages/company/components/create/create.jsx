import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { CompanyAPI } from "../../../../services/company";
import { setImageSlice } from "../../../../store/image/slice";
import {
  setStatusText,
  setClearErrorAction,
} from "../../../../store/company/slice";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import CompanyForm from "../../../../components/forms/company-form/form";
import PageTitle from "../../../../components/page-title/page-title";
import FileInputRow from "../../../../components/forms/company-form/add-file";

import styles from "../../styles.module.scss";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image } = useSelector((state) => state.image);
  const { listFile } = useSelector((state) => state.file);
  const { status, errorStatus } = useSelector((state) => state.company);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phones: [],
      fax: "",
      email: "",
      website: "",
      working_days_hours: "",
      avc: "",
      tax_type: "",
      account_number: "",
      bank: "",
      image: "",
      city_id: "",
      upload_file: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.phones = data.phones.filter(
      (item) => item && !item.value && typeof item !== "object"
    );
    data.image = image ? image : null;

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

    dispatch(CompanyAPI.postCompany(data));
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
      navigate,
      navigatePath: "/company",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Ավելացնել նոր կազմակերպություն" />

      <div className={styles.create_service}>
        <CompanyForm control={control} image={image} errors={errors} />
        <h3>Կցել փաստաթղթեր</h3>
        <FileInputRow
          control={control}
          name="upload_file"
          url="partner-companies"
        />
        <div className={styles.btn}>
          <MainButton
            variant="contained"
            type="submit"
            onClick={onSubmit}
            startIcon={<AddIcon className={styles.btn_icon} />}
          >
            Ավելացնել
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
