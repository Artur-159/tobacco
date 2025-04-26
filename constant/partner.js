export const defaultValues = {
  name: "",
  address: "",
  phones: "",
  fax: "",
  email: "",
  website: "",
  working_days_hours: "",
  avc: "",
  tax_type: "",
  account_number: "",
  bank: "",
  image: "",
  city_id: "",
  upload_file: [
    {
      name: "",
      file_select_type: "",
      issue_number: "",
      deadline: "",
      file: null,
    },
  ],
};

// after discussion move into forms folder

export const FILE_TYPE_OPTIONS = [
  { label: "լիազորագիր", value: "authorized" },
  { label: "պայմանագիր", value: "applicant" },
  { label: "այլ", value: "other" },
];
