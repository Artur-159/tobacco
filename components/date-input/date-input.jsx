import { useController } from "react-hook-form";
import clsx from "clsx";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({
  className,
  placeholder,
  name,
  control,
  defaultValue,
  error,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: defaultValue ? dayjs(defaultValue) : null,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hy-am">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={placeholder}
          slotProps={{ textField: { size: "small" } }}
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            field.onChange(
              newValue ? dayjs(newValue).format("YYYY-MM-DD") : null
            );
          }}
          helperText={error?.message}
          error={!!error}
          className={clsx(className)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateInput;
