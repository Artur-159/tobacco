import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { PartnerAPI } from "../../../../services/partner";
import {
  setStatusText,
  setClearErrorAction,
} from "../../../../store/partner/slice";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { setImageSlice } from "../../../../store/image/slice";
import { defaultValues } from "../../../../constant/partner";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import CompanyForm from "../../../../components/forms/company-form/form";
import FileInputRow from "../../../../components/forms/company-form/add-file";
import AddIcon from "@mui/icons-material/Add";
import RadioButtons from "../radio-buttons/radio-buttons";
import PageTitle from "../../../../components/page-title/page-title";

import styles from "../../styles.module.scss";

const CreatePartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const extractedPart =
    location.pathname.split("/")[1].split("-")[1] === "authorized"
      ? "authorized"
      : "applicant";

  const [workingType, setWorkingType] = useState(extractedPart);

  const { image } = useSelector((state) => state.image);
  const { listFile } = useSelector((state) => state.file);
  const { status, errorStatus } = useSelector((state) => state.partner);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image = image;
    data.company_is = workingType;
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

    dispatch(PartnerAPI.postPartner(data));
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
      navigatePath:
        workingType === "authorized"
          ? "/partner-authorized"
          : "/partner-applicant",
      clearErrorAction: () => dispatch(setClearErrorAction()),
    });
  }, [status, errorStatus, dispatch, workingType, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <PageTitle title="Ավելացնել նոր կազմակերպություն" />

      <div className={styles.create_service}>
        <CompanyForm
          control={control}
          path={image}
          errors={errors}
          className={styles.partner_form}
        />

        <RadioButtons
          workingType={workingType}
          setWorkingType={setWorkingType}
          className={styles.radioBtns}
        />
        <h3>Կցել փաստաթղթեր</h3>
        <FileInputRow
          control={control}
          name="upload_file"
          url="partner-companies"
        />
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

export default CreatePartner;
