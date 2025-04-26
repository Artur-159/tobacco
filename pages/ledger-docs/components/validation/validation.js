import * as yup from "yup";

export const validation = yup.object().shape({
  trademark_objection_id: yup.string().required("Դաշտը պարտադիր է"),

  doc_type: yup.number().required("Գործառնության տեսակ դաշտը պարտադրիր է"),

  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Ֆայլի ձևաչափը սխալ է!", (value) => {
      if (!value) return false;
      const allowedFormats = ["pdf", "doc", "docx", "jpg", "msg"];
      const fileExtension = value[0].name.split(".").pop().toLowerCase();
      return allowedFormats.includes(fileExtension);
    }),
});
