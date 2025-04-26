export const generateFormFields = (control, options, durationOptions) => {
  return [
    {
      type: "TextInput",
      name: "trade_mark_name",
      control,
      placeholder: "Ապրանքային նշան",
    },
    {
      type: "TextInput",
      name: "trade_mark_armenian_name",
      control,
      placeholder: "Ապրանքային նշանը Հայերեն",
    },
    {
      type: "TextInput",
      name: "application_number",
      control,
      placeholder: "Հայտի N",
    },
    {
      type: "TextInput",
      name: "registration_number",
      control,
      placeholder: "Գրանցման N",
    },
    {
      type: "MainSelect",
      name: "owner_id",
      control,
      options: options.owner,
      placeholder: "Սեփականատերը",
    },
    {
      type: "MainSelect",
      name: "classes",
      control,
      options: options.niceClasses,
      placeholder: "Նիցայի դասակարգիչ",
    },
    {
      type: "MainSelect",
      name: "city_id",
      control,
      options: options.city,
      placeholder: "Գրանցման երկիրը",
    },
    {
      type: "MainSelect",
      name: "registration_expiry_date",
      control,
      options: durationOptions,
      placeholder: "Գրանցման ավարտը",
    },
    {
      type: "MainSelect",
      name: "representative",
      control,
      options: options.authorizes,
      placeholder: "Լիազորված անձ",
    },
  ];
};

export const generateObjectionsFields = (control, options, durationOptions) => {
  return [
    {
      type: "TextInput",
      name: "trade_mark_name",
      control,
      placeholder: "Ապրանքային նշան",
    },
    {
      type: "TextInput",
      name: "trade_mark_armenian_name",
      control,
      placeholder: "Ապրանքային նշանը Հայերեն",
    },
    {
      type: "TextInput",
      name: "application_number",
      control,
      placeholder: "Հայտի N",
    },
    {
      type: "TextInput",
      name: "registration_number",
      control,
      placeholder: "Գրանցման N",
    },

    {
      type: "MainSelect",
      name: "city_id",
      control,
      options: options.city,
      placeholder: "Գրանցման երկիրը",
    },
    {
      type: "MainSelect",
      name: "registrar",
      control,
      options: options.registrar,
      placeholder: "Առարկություն ներկայացնողը",
    },
    {
      type: "MainSelect",
      name: "representative",
      multiple: true,
      control,
      options: options.representative,
      placeholder: "Գրանցողը",
    },
  ];
};
