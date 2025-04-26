import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextInput from "../../component/text-input/text-input";
import MainButton from "../../component/button/button";
import { AuthorizationAPI } from "../../services/authorization";

import styles from "./styles.module.scss";

const Registration = () => {
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(AuthorizationAPI.postRegSubAdmin(data));
  });

  return (
    <div className={styles.reg}>
      <h1>Registration</h1>
      <div>
        <TextInput
          type="text"
          name="name"
          placeholder="name"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="email"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="phone"
          name="phone"
          placeholder="phone"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
      </div>
      <div>
        <TextInput
          type="password"
          name="password"
          placeholder="password"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="password"
          name="password_confirmation"
          placeholder="password confirmation"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
      </div>
      <div className={styles.btn_log_reg}>
        <MainButton
          variant={"contained"}
          className={styles.btn}
          type="submit"
          onClick={onSubmit}
        >
          Registration
        </MainButton>
      </div>
    </div>
  );
};
export default Registration;
