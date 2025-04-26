import DateInput from "../components/date-input/date-input";
import MainSelect from "../components/main-select/main-select";
import TextInput from "../components/text-input/text-input";

export const TRADE_MARK_FIELDS = [
  {
    component: TextInput,
    name: "application_number",
    placeholder: "Հայտի համար *",
    size: "small",
  },
  {
    component: DateInput,
    name: "publication_date",
    placeholder: "Հրապարակման թվական",
  },
  {
    component: DateInput,
    name: "publication_expiry",
    placeholder: "Հրապարակման ավարտ",
  },
  {
    component: DateInput,
    name: "filling_date",
    placeholder: "Հայտի ներկայացման թվական",
  },
  {
    component: TextInput,
    name: "registration_number",
    placeholder: "Գրանցման համար",
    size: "small",
  },
  {
    component: DateInput,
    name: "registration_date",
    placeholder: "Գրանցման թվական",
  },
  {
    component: DateInput,
    name: "registration_expiry_date",
    placeholder: "Գրանցման ենթադրյալ ավարտ",
  },
  {
    component: DateInput,
    name: "designation_date",
    placeholder: "Առարկության թվական",
  },
  {
    component: DateInput,
    name: "designation_expired_date",
    placeholder: "Առարկության վերջնաժամկետ",
  },
  {
    component: DateInput,
    name: "rejection_date",
    placeholder: "Մերժման ամսաթիվ",
  },
  {
    component: TextInput,
    name: "rejection",
    placeholder: "Մերժում",
    size: "small",
  },
  {
    component: DateInput,
    name: "termination_date",
    placeholder: "Դադարեցման ամսաթիվ ",
  },
  {
    component: MainSelect,
    name: "owner_id",
    placeholder: "Սեփականատեր",
    options: "owner",
  },
  {
    component: MainSelect,
    name: "representatives",
    placeholder: "Լիազորված անձ",
    options: "representatives",
    isMulti: true,
  },
  {
    component: TextInput,
    name: "trade_mark_name",
    placeholder: "Ապրանքային նշան *",
    size: "small",
  },
  {
    component: TextInput,
    name: "trade_mark_armenian_name",
    placeholder: "Ապրանքային նշանը Հայերեն *",
    size: "small",
  },
  {
    component: MainSelect,
    name: "types",
    placeholder: "Ապրանքային նշանի տեսակը",
    options: "types",
    isMulti: true,
  },
  {
    component: TextInput,
    name: "vienna_classification",
    placeholder: "Վիեննայի դասակարգիչ",
    size: "small",
  },
  {
    component: TextInput,
    name: "description",
    placeholder: "Նկարագրություն",
    rows: 2,
    multiline: true,
  },
];

export const MARK_TYPE = [
  { value: 12, label: "Բառային" },
  { value: 3, label: "Համակցված" },
  { value: 2, label: "Ծավալային" },
  { value: 6, label: "Հոլոգրաֆիկ" },
];

export const FIELDS = [
  { label: "Հայտի համար", key: "application_number" },
  { label: "Հայտի ներկայացման թվական", key: "filling_date" },
  { label: "Գրանցման համար", key: "registration_number" },
  { label: "Գրանցման թվական", key: "registration_date" },
  { label: "Գրանցման ենթադրյալ ավարտ", key: "registration_expiry_date" },
  {
    label: "Նիցայի դասակարգիչ",
    key: "classes",
    format: (val) => val?.map((cls) => cls.name).join(", ") || "—",
  },
  {
    label: "Ապրանքային նշանի տեսակը",
    key: "types",
    format: (val) => val?.map((type) => type.mark_type).join(", ") || "—",
  },
  {
    label: "Սեփականատերը",
    key: "owner",
    format: (val) => val?.name || "—",
  },
  {
    label: "Լիազորված անձ",
    key: "representatives",
    format: (val) => val?.map((rep) => rep.name).join(", ") || "—",
  },
];

export const FIELDS_COUNTERS = [
  { label: "Գրանցող օգտատերը", key: "creator" },
  {
    className: "countries",
    label: "Գրանցված երկրները",
    key: "attach_countries",
  },
];

export const DOWNLOAD_SELECT_OPTIONS = [
  {
    value: 0,
    label: "Ոչ",
  },
  {
    value: 1,
    label: "Այո",
  },
];

export const DURATION_OPTIONS = [
  {
    label: "անժամկետ",
    value: "expired: no",
  },
  { label: "մինչև 1 տարի", value: "Y: 1" },
  { label: "մինչև 6 ամիս", value: "M: 6" },
  { label: "մինչև 3 ամիս", value: "M: 3" },
  { label: "մինչև 1 ամիս", value: "M: 1" },
  { label: "մինչև 15 օր", value: "D: 15" },
  { label: "մինչև 7 օր", value: "D: 7" },
  { label: "մինչև 1 օր", value: "D: 1" },
  { label: "ժամկետանց", value: "expired: yes" },
];
