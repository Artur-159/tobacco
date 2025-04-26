import * as yup from "yup";

export const validation = yup.object().shape({
  trademark_objection_id: yup.string().required("Դաշտը պարտադիր է"),

  operation_type: yup
    .number()
    .required("Գործառնության տեսակ դաշտը պարտադրիր է"),

  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("Գումարը պետք է լինի թիվ"),

  // currency: yup
  //   .object()
  //   .nullable()
  //   .shape({
  //     name: yup.string().required("Արժույթ դաշտը պարտադիր է"),
  //     label: yup.string(),
  //   })
  //   .when("amount", {
  //     is: (value) => Boolean(value),
  //     then: yup
  //       .object()
  //       .shape({
  //         name: yup.string().required("Արժույթ դաշտը պարտադիր է"),
  //         label: yup.string(),
  //       })
  //       .nullable()
  //       .required("Արժույթ դաշտը պարտադիր է"),
  //     otherwise: yup.mixed().nullable(),
  //   }),

  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Ֆայլի ձևաչափը սխալ է", (value) => {
      if (!value || value.length === 0) return false;
      const allowedFormats = ["pdf", "doc", "docx", "jpg", "msg"];
      const fileExtension = value[0].name.split(".").pop().toLowerCase();
      return allowedFormats.includes(fileExtension);
    }),
});
