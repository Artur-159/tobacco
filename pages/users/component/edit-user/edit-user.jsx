import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalValid } from "../validation/validation";
import { AuthorizationAPI } from "../../../../services/authorization";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import {
  setErrorStatus,
  setStatus,
} from "../../../../store/authorization/slice";
import { setImageSlice } from "../../../../store/image/slice";
import { PERSONAL_FORM, ROLE_OPTION } from "../../../../constant/users";
import { SelectOption } from "../../../../utils/select-options";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import Image from "../../../../components/uploads/image/image";
import MainSelect from "../../../../components/main-select/main-select";
import PageTitle from "../../../../components/page-title/page-title";
import EditIcon from "@mui/icons-material/Edit";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import Back from "../../../../components/back-btn/back-btn";
import IsBlocked from "../is-blocked/is-blocked";

import styles from "./styles.module.scss";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, errorStatus, oneUser } = useSelector(
    (state) => state.authorization
  );
  const image = useSelector((state) => state.image.image);
  const list = useSelector((state) => state.company.list);
  const partners = useSelector((state) => state.partner.partners);

  const companyValue = useMemo(() => SelectOption(list), [list]);
  const partnerValue = useMemo(() => SelectOption(partners), [partners]);

  const options = useMemo(
    () => (oneUser?.company_id ? companyValue : partnerValue),
    [oneUser?.company_id, companyValue, partnerValue]
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...oneUser },
    resolver: yupResolver(personalValid),
  });

  useEffect(() => {
    dispatch(AuthorizationAPI.getOneUser(userId));
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartners());
    dispatch(setImageSlice(""));
    dispatch(setStatus(null));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneUser);
    dispatch(setImageSlice(oneUser?.image));
  }, [reset, dispatch, oneUser]);

  const onSubmit = handleSubmit((data) => {
    data.image = image || oneUser.image;
    data.is_blocked = data.is_blocked ? 1 : 0;
    if (oneUser.company_id) {
      data.company_id = data.company_id ? data.company_id : oneUser.company_id;
    } else {
      data.partner_company_id = data.partner_company_id
        ? data.partner_company_id
        : oneUser.partner_company_id;
    }
    dispatch(AuthorizationAPI.putUpdateUserInfo(data));
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
      navigatePath: "/users",
      clearErrorAction: () => dispatch(setErrorStatus()),
    });
  }, [status, errorStatus, dispatch, navigate]);

  return (
    <div className={styles.container}>
      <Back />
      <PageTitle className={styles.title} title="Փոխել օգտատիրոջ տվյալները" />
      {PERSONAL_FORM.map((item) => (
        <div key={item.name} className={styles.form_input}>
          {item.name === "role" ? (
            <>
              <div className={styles.role}>{item.placeholder}</div>
              <MainSelect
                control={control}
                name={item.name}
                options={ROLE_OPTION}
                isDisabled={oneUser.role === 4 ? true : false}
                defaultValue={ROLE_OPTION.find(
                  (option) => option.value === oneUser.role
                )}
                className={styles.select}
                error={errors[item.name]?.message}
              />
            </>
          ) : ["company_id", "partner_company_id"].includes(item.name) ? (
            <>
              <div className={styles.partners}>{item.placeholder}</div>
              <MainSelect
                control={control}
                name={item.name}
                options={options}
                className={styles.select}
                isDisabled={oneUser.role === 4}
                error={errors[item.name]?.message}
              />
            </>
          ) : (
            <TextInput
              size="small"
              control={control}
              name={item.name}
              type={item.type ? item.type : "text"}
              placeholder={item.placeholder}
              error={errors[item.name]?.message}
            />
          )}
        </div>
      ))}

      <Image
        control={control}
        name="image"
        image={image}
        className={styles.personal_img}
      />
      <MainButton
        variant="contained"
        onClick={onSubmit}
        startIcon={<EditIcon />}
        className={styles.btn_create}
      >
        Փոխել տվյալները
      </MainButton>
      <div className={styles.checkBox_block}>
        <IsBlocked />
      </div>
    </div>
  );
};

export default memo(EditUser);
