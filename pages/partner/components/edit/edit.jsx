import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { PartnerAPI } from "../../../../services/partner";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/partner/slice";
import { setImageSlice } from "../../../../store/image/slice";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import CompanyForm from "../../../../components/forms/company-form/form";
import FileInputRow from "../../../../components/forms/company-form/add-file";
import PageTitle from "../../../../components/page-title/page-title";
import RadioButtons from "../radio-buttons/radio-buttons";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../../styles.module.scss";

const EditPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [workingType, setWorkingType] = useState("applicant");

  const { image } = useSelector((state) => state.image);
  const { status, errorStatus, onePartner } = useSelector(
    (state) => state.partner
  );
  const { listFile } = useSelector((state) => state.file);

  let defaultValues = { ...onePartner };

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
    dispatch(PartnerAPI.getOnePartner(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(onePartner);
    if (onePartner?.companyis) {
      setWorkingType(
        onePartner.companyis === "authorized" ? "authorized" : "applicant"
      );
    }
    dispatch(setImageSlice(onePartner?.image));
  }, [reset, dispatch, onePartner]);

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
          file_select_type: item?.file_select_type,
        };
      });
    }
    dispatch(PartnerAPI.putUpdatePartner(data));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(false) },
        { action: dispatch, payload: setImageSlice("") },
      ],
      successMessage: "Տվյալները հաջողությամբ փոփոխված են",
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
      <PageTitle title="Փոխել կազմակերպության տվյալները" />

      <div className={styles.create_service}>
        <CompanyForm control={control} errors={errors} image={image} />
        <RadioButtons
          workingType={workingType}
          setWorkingType={setWorkingType}
        />
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
            className={styles.btn}
            startIcon={<EditIcon className={styles.btn_icon} />}
          >
            Փոխել տվյալները
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default EditPartner;
