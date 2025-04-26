import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthorizationAPI } from "../../services/authorization";
import { setErrorStatus } from "../../store/authorization/slice";
import TextInput from "../../components/text-input/text-input";
import MainButton from "../../components/button/button";
import Toast from "../../helpers/status-text";

import styles from "./styles.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      recaptcha_token: null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    data.recaptcha_token = token;

    try {
      await dispatch(AuthorizationAPI.postLogin(data)).unwrap();
      navigate("/home");
      dispatch(setErrorStatus(null));
    } catch (error) {
      Toast.error(error.message);
    }
  });

  const handleReCAPTCHAVerify = (token) => {
    setToken(token);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.lock_icon}>
          <img width={25} height={30} src="/icons/lock.svg" alt="lock" />
        </div>
        <h1 className={styles.login_title}>Sign in</h1>
        <span className={styles.login_text}>
          Welcome, please sign in to continue
        </span>
        <div className={styles.login_form}>
          <TextInput
            control={control}
            errors={errors}
            type="login"
            name="email"
            placeholder="email"
            className={styles.login_input}
          />
          <TextInput
            errors={errors}
            name="password"
            type="password"
            control={control}
            placeholder="password"
            className={styles.login_input}
          />
        </div>

        <ReCAPTCHA
          sitekey={SITE_KEY}
          className={styles.recaptcha}
          onChange={handleReCAPTCHAVerify}
        />

        <div className={styles.btn_log_reg}>
          <MainButton
            type="submit"
            onClick={onSubmit}
            variant="contained"
            className={styles.btn}
          >
            Sign in
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
