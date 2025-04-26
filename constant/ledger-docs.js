import dayjs from "dayjs";
import React from "react";

export const getShortcutsItems = () => [
  {
    label: "Այսօր",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("day"), today.endOf("day")];
    },
  },
  {
    label: "Երեկ",
    getValue: () => {
      const today = dayjs();
      const yesterday = today.subtract(1, "day");
      return [yesterday.startOf("day"), yesterday.endOf("day")];
    },
  },
  {
    label: "Վերջին 7 օրը",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Վերջին 30 օրը",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(30, "day"), today];
    },
  },
  {
    label: "Այս ամիս",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Անցած ամիս",
    getValue: () => {
      const today = dayjs();
      const lastMonth = today.subtract(1, "month");
      return [lastMonth.startOf("month"), lastMonth.endOf("month")];
    },
  },
  {
    label: "Այս տարի",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("year"), today.endOf("year")];
    },
  },
  {
    label: "Անցած տարի",
    getValue: () => {
      const today = dayjs();
      const lastYear = today.subtract(1, "year");
      return [lastYear.startOf("year"), lastYear.endOf("year")];
    },
  },
  {
    label: "X",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(30, "day"), today];
    },
  },
];

export const useRangeHandlers = () => {
  const [selectedRange, setSelectedRange] = React.useState([null, null]);

  const handleInputChange = (index, value) => {
    const parsedDate = dayjs(value, "YYYY-MM-DD", true);
    if (parsedDate.isValid() || value === "") {
      const newRange = [...selectedRange];
      newRange[index] = value === "" ? null : parsedDate;
      setSelectedRange(newRange);
    }
  };

  const handlePickerChange = (newValue) => {
    setSelectedRange(newValue);
  };

  return { selectedRange, handleInputChange, handlePickerChange };
};
