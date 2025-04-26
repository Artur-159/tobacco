import TextInput from "../text-input/text-input";
import { getShortcutsItems } from "../../constant/ledger-docs";
import dayjs from "dayjs";
import "dayjs/locale/hy-am";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";

dayjs.locale("hy-am");

const shortcutsItems = getShortcutsItems();

const TimeFilter = ({ control, selectedRange, setSelectedRange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hy-am">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextInput
            control={control}
            name="start_date"
            placeholder="Սկիզբ"
            size="small"
            type="text"
            value={selectedRange[0]?.format("YYYY-MM-DD") || ""}
            onChange={(e) => {
              setSelectedRange([dayjs(e.target.value), selectedRange[1]]);
            }}
            localeText={{ start: "Սկիզբ", end: "Ավարտ" }}
          />
          <TextInput
            control={control}
            name="end_date"
            placeholder="Ավարտ"
            size="small"
            type="text"
            value={selectedRange[1]?.format("YYYY-MM-DD") || ""}
            onChange={(e) => {
              setSelectedRange([selectedRange[0], dayjs(e.target.value)]);
            }}
          />
        </Box>
        <StaticDateRangePicker
          value={selectedRange}
          onChange={(newValue) => {
            setSelectedRange(newValue);
          }}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            toolbar: {
              hidden: true,
            },
            actionBar: {
              actions: [],
            },
          }}
          calendars={2}
          sx={{
            "& .MuiDateRangePickerViewDesktop-root": {
              maxWidth: "300px",
            },
            "& .MuiPickersCalendarHeader-root": {
              fontSize: "0.75rem",
            },
            "& .MuiDayCalendar-weekContainer": {
              fontSize: "0.75rem",
            },
            "& .MuiPickersDay-root": {
              width: "28px",
              height: "28px",
            },
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "#1976D2",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TimeFilter;
