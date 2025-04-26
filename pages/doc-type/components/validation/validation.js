import * as yup from "yup";

export const validation = yup.object().shape({
  doc_type: yup.string().required("Փաստաթղթի տեսակ դաշտը պարտադիր է!"),
});
