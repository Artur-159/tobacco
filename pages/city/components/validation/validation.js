import * as yup from "yup";

export const validation = yup.object().shape({
  name: yup.string().required("Անունը պարտադիր է!"),
  country_code: yup.string().required("Երկրի կոդը պարտադիր է!"),
});
