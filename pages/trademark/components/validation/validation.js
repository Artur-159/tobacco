import * as yup from "yup";

export const validation = yup.object().shape({
  trade_mark_name: yup.string().required("Հայտի համար դաշտը պարտադիր է!"),
  application_number: yup
    .string()
    .required("Ապրանքային նշան դաշտը պարտադիր է!"),
  trade_mark_armenian_name: yup
    .string()
    .required("Հայերեն ապրանքային նշան դաշտը պարտադիր է!"),
});
