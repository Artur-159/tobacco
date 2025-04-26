import * as yup from "yup";

export const validation = yup.object().shape({
  operation_type: yup.string().required("Դաշտը պարտադիր է!"),
});
