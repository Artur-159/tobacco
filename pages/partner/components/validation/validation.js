import * as yup from "yup";

export const validation = yup.object().shape({
  name: yup.string().required("Կազմակերպության անվանումը պարտադիր դաշտ է"),
});
