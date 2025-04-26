export const filterPersonalForm = (formFields, isCompany) => {
  return formFields.filter((item) =>
    isCompany ? item.name !== "partner_company_id" : item.name !== "company_id"
  );
};
