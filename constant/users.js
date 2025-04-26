const USERS_TABLE_SUBTITLE = [
  "Օգտատեր",
  "Անուն",
  "Էլ. հասցե",
  "Հեռախոսահամար",
  "Ընկերություն",
  "Դերը",
  "Ակտիվ / Արգելափակված",
  " ",
];

const ROLE_BUTTONS = [
  { label: "Գլխավոր ադմին", value: 4 },
  { label: "Ադմին", value: 3 },
  { label: "Օգտատեր", value: 2 },
  { label: "Հյուր", value: 1 },
  { label: "Բոլորը", value: null },
];

const CREATE_USER = [
  { name: "name", placeholder: "Անուն Ազգանուն *" },
  { name: "email", placeholder: "Էլ-փոստ *" },
  { name: "password", placeholder: "Գաղտնաբառ *" },
  { name: "phone", placeholder: "Հեռախոսահամար" },
  { name: "company_id", placeholder: "Կազմակերպության անվանումը" },
  {
    name: "partner_company_id",
    placeholder: "Գործընկեր կազմակերպության անվանումը",
  },
  { name: "role", placeholder: "Դերը *" },
];

const ROLE_OPTION = [
  { label: "Գլխավոր ադմին", value: 4 },
  { label: "Ադմին", value: 3 },
  { label: "Օգտատեր", value: 2 },
  { label: "Հյուր", value: 1 },
];

const PERSONAL_FORM = [
  { name: "name", placeholder: "Անուն Ազգանուն" },
  { name: "email", placeholder: "Էլ-փոստ *" },
  { name: "password", placeholder: "Գաղտնաբառ" },
  { name: "phone", placeholder: "Հեռախոսահամար" },
  { name: "company_id", placeholder: "Ընկերությունը" },
  {
    name: "partner_company_id",
    placeholder: "Գործընկեր կազմակերպության անվանումը",
  },
  { name: "role", placeholder: "Դերը" },
];

export {
  ROLE_BUTTONS,
  PERSONAL_FORM,
  USERS_TABLE_SUBTITLE,
  CREATE_USER,
  ROLE_OPTION,
};
