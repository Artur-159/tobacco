import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthorizationAPI } from "../../../../services/authorization";
import { setStatus } from "../../../../store/authorization/slice";
import { setImageSlice } from "../../../../store/image/slice";
import { createAdminValid } from "../validation/validation";
import { SelectOption } from "../../../../utils/select-options";
import { CREATE_USER, ROLE_OPTION } from "../../../../constant/users";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import PageTitle from "../../../../components/page-title/page-title";
import MainSelect from "../../../../components/main-select/main-select";
import Image from "../../../../components/uploads/image/image";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles.module.scss";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.authorization);
  const { image } = useSelector((state) => state.image);
  const { list } = useSelector((state) => state.company);
  const { partners } = useSelector((state) => state.partner);

  let optionsValue = SelectOption(list);
  let partnerOptionsValue = SelectOption(partners);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      phone: "",
      company_id: "",
      partner_company_id: "",
      role: "",
    },
    resolver: yupResolver(createAdminValid),
  });

  useEffect(() => {
    dispatch(CompanyAPI.getCompanies());
    dispatch(PartnerAPI.getPartners());
  }, [dispatch]);

  const onSubmit = handleSubmit((data) => {
    data.image = image ? image : "";

    dispatch(AuthorizationAPI.postCreateUser(data))
      .unwrap()
      .then(() => {
        navigate("/users");
        dispatch(setStatus(null));
        dispatch(setImageSlice(""));
        Toast.success("Հաջողությամբ ստեղծված է");
      })
      .catch((error) => {
        Toast.error(error.message);
      });
  });

  return (
    <>
      <Back />
      <div className={styles.create_user}>
        <PageTitle title="Ստեղծել նոր Օգտատեր" className={styles.title} />
        <div className={styles.user_box}>
          {CREATE_USER?.map(({ name, placeholder }, index) => (
            <div key={index} className={styles.form_input}>
              {["company_id", "partner_company_id", "role"].includes(name) ? (
                <MainSelect
                  control={control}
                  name={name}
                  isSearchable={true}
                  options={
                    name === "company_id"
                      ? optionsValue
                      : name === "partner_company_id"
                      ? partnerOptionsValue
                      : ROLE_OPTION
                  }
                  className={styles.select}
                  error={errors[name]?.message}
                  placeholder={placeholder}
                />
              ) : (
                <TextInput
                  control={control}
                  name={name}
                  size="small"
                  placeholder={placeholder}
                  className={styles.form_input}
                  error={errors[name]?.message}
                  type={name === "password" ? "password" : "text"}
                />
              )}
            </div>
          ))}

          <Image
            control={control}
            name="image"
            status={status}
            image={image}
            className={styles.city_img}
            error={errors.image?.message}
          />
        </div>
        <MainButton
          variant="contained"
          onClick={onSubmit}
          className={styles.btn_create}
          startIcon={<AddIcon />}
        >
          Ավելացնել
        </MainButton>
      </div>
    </>
  );
};

export default CreateAdmin;
