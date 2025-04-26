import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalValid } from "../validation/validation";
import { AuthorizationAPI } from "../../../../services/authorization";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import { setStatus } from "../../../../store/authorization/slice";
import { setImageSlice } from "../../../../store/image/slice";
import { PERSONAL_FORM, ROLE_OPTION } from "../../../../constant/users";
import Toast from "../../../../helpers/status-text";
import { SelectOption } from "../../../../utils/select-options";
import { filterPersonalForm } from "../../../../utils/filter-personal-form";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import Image from "../../../../components/uploads/image/image";
import MainSelect from "../../../../components/main-select/main-select";
import PageTitle from "../../../../components/page-title/page-title";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./styles.module.scss";

const Personal = () => {
  const dispatch = useDispatch();
  const authUserId = localStorage.getItem("userId");

  const { status, oneUser } = useSelector((state) => state.authorization);
  const image = useSelector((state) => state.image.image);
  const list = useSelector((state) => state.company.list);
  const partners = useSelector((state) => state.partner.partners);

  const companyValue = useMemo(() => SelectOption(list), [list]);
  const partnerValue = useMemo(() => SelectOption(partners), [partners]);

  const options = useMemo(
    () => (oneUser?.company_id ? companyValue : partnerValue),
    [oneUser?.company_id, companyValue, partnerValue]
  );

  const isShowRoleField = oneUser?.role === 4;

  const filteredForm = useMemo(
    () =>
      filterPersonalForm(
        PERSONAL_FORM.filter(
          (field) =>
            field.name !== "password" &&
            !(field.name === "role" && !isShowRoleField)
        ),
        !!oneUser?.company_id
      ),
    [oneUser?.company_id, isShowRoleField]
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...oneUser },
    resolver: yupResolver(personalValid),
  });

  useEffect(() => {
    dispatch(AuthorizationAPI.getOneUser(authUserId));
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartners());
    dispatch(setImageSlice(""));
    dispatch(setStatus(false));
  }, [dispatch, authUserId]);

  useEffect(() => {
    reset(oneUser);
    if (oneUser?.image) {
      dispatch(setImageSlice(oneUser?.image));
    }
  }, [reset, dispatch, oneUser]);

  const onSubmit = handleSubmit((data) => {
    data.image = image || oneUser.image;
    if (oneUser.company_id) {
      data.company_id = data.company_id ? data.company_id : oneUser.company_id;
    } else {
      data.partner_company_id = data.partner_company_id
        ? data.partner_company_id
        : oneUser.partner_company_id;
    }
    dispatch(AuthorizationAPI.putUpdatePersonalInfo(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Տվյալները հաջողությամբ փոփոխված են", false, {
        onClose: () => {
          dispatch(setStatus(false));
          dispatch(setImageSlice(""));
          dispatch(AuthorizationAPI.getOneUser(authUserId));
        },
      });
    }
  }, [status, dispatch, authUserId]);

  return (
    <div className={styles.container}>
      <PageTitle title="Անձնական տվյալներ" className={styles.title} />
      {filteredForm.map((item) => (
        <div key={item.name} className={styles.form_input}>
          {item.name === "role" && oneUser.role === 4 ? (
            <>
              <div className={styles.role_text}>{item.placeholder}</div>
              <MainSelect
                control={control}
                name={item.name}
                options={ROLE_OPTION}
                isDisabled={true}
                defaultValue={ROLE_OPTION.find(
                  (option) => option.value === oneUser.role
                )}
                className={styles.select}
              />
            </>
          ) : ["company_id", "partner_company_id"].includes(item.name) ? (
            <>
              <div className={styles.company_text}>{item.placeholder}</div>
              <MainSelect
                control={control}
                name={item.name}
                options={options}
                isDisabled={oneUser.role === 4 ? false : true}
                className={styles.select}
              />
            </>
          ) : (
            <TextInput
              size="small"
              control={control}
              name={item.name}
              placeholder={item.placeholder}
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
    </div>
  );
};

export default memo(Personal);
