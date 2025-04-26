import { getDisplayValue } from "../utils/get-display-value";

export const OBJECTIONS_FORM_DATA = [
  { name: "application_number", placeholder: "Հայտի համար" },
  { name: "filling_date", placeholder: "Հայտի ներկայացման թվական" },
  {
    name: "registration_number",
    type: "number",
    placeholder: "Գրանցման համար",
  },
  { name: "registration_date", type: "date", placeholder: "Գրանցման թվական " },
  { name: "designation_date", type: "date", placeholder: "Առարկության թվական" },
  {
    name: "designation_expired_date",
    type: "date",
    placeholder: "Առարկության վերջնաժամկետ",
  },
];

export const INFO_SECTION_DATA = [
  { label: "Հայտի N", value: "application_number" },
  {
    label: "Հայտի ներկայացման թվականը",
    value: "filling_date",
  },
  { label: "Գրանցման համար", value: "registration_number" },
];

export const DESIGNATION_INFO = [
  { label: "Գրանցման թվական", value: "registration_date" },
  { label: "Առարկության թվականը", value: "designation_date" },
  { label: "Առարկության վերջնաժամկետը", value: "designation_expired_date" },
];

export const getDetailRows = ({
  id,
  application_number,
  trade_mark_name,
  trade_mark_armenian_name,
  registration_number,
  registration_date,
  filling_date,
  designation_date,
  designation_expired_date,
}) => [
  { label: "ID", value: id },
  { label: "Հայտի N", value: application_number },
  { label: "Ապրանքային նշան", value: trade_mark_name },
  { label: "Ապրանքային նշանը Հայերեն", value: trade_mark_armenian_name },
  { label: "Գրանցման համար", value: registration_number },
  { label: "Գրանցման թվական", value: getDisplayValue(registration_date) },
  { label: "Հայտի ներկայացման թվական", value: getDisplayValue(filling_date) },
  { label: "Առարկության թվական", value: getDisplayValue(designation_date) },
  {
    label: "Առարկության վերջնաժամկետ",
    value: getDisplayValue(designation_expired_date),
  },
];

export const getAdditionalInfo = ({
  currentUser,
  currentApplicant,
  description,
  currentRepresentatives,
}) => [
  { label: "Ստեղծողը", value: currentUser },
  { label: "Գրանցողը", value: currentApplicant },
  { label: "Նկարագրություն", value: getDisplayValue(description) },
  { label: "Առարկություն ներկայացնողը", value: currentRepresentatives },
];
