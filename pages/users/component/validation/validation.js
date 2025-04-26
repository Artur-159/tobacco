import * as yup from "yup";

const createAdminValid = yup
  .object()
  .shape({
    name: yup.string().required("Անուն Ազգանուն դաշտը պարտադիր է!"),
    email: yup
      .string()
      .required("Էլ. հասցե դաշտը պարտադիր է!")
      .email("Խնդրում ենք մուտքագրել վավեր էլ. հասցե"),
    password: yup.string().required("Անուն դաշտը պարտադիր է!"),
    role: yup
      .string()
      .required("Դաշտը պարտադիր է!")
      .transform((value) => (value?.value ? String(value.value) : value)),
  })
  .test(
    "company_or_partner_required",
    "Either company_id or partner_company_id is required, but not both",
    function (value) {
      const { company_id, partner_company_id } = value;

      if (!company_id && !partner_company_id) {
        return this.createError({
          path: "partner_company_id",
          message:
            "«Կազմակերպության անվանում» կամ «Գործընկեր կազմակերպության անվանում» դաշտերից մեկը պարտադիր է",
        });
      }

      if (company_id && partner_company_id) {
        return this.createError({
          path: "partner_company_id",
          message:
            "Միայն մեկ դաշտ կարող է լրացված լինել. կամ «Կազմակերպության անվանում», կամ «Գործընկեր կազմակերպության անվանում»",
        });
      }

      return true;
    }
  );

const personalValid = yup.object().shape({
  name: yup.string().required("Անուն դաշտը պարտադիր է!"),
  email: yup
    .string()
    .required("Էլ. հասցե դաշտը պարտադիր է!")
    .email("Խնդրում ենք մուտքագրել վավեր էլ. հասցե"),
});

export { createAdminValid, personalValid };
