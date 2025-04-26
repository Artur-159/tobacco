import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { OperationTypesAPI } from "../../../../services/operation-types";
import Params from "../../../../helpers/params";
import TimeFilter from "../../../../components/time-filter/time-filter";
import Button from "../../../../components/button/button";

const Filter = () => {
  const dispatch = useDispatch();

  const last30Days = [dayjs().subtract(30, "day"), dayjs()];

  const [selectedRange, setSelectedRange] = useState(last30Days);

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      start_date: last30Days[0].format("YYYY-MM-DD"),
      end_date: last30Days[1].format("YYYY-MM-DD"),
    },
  });

  useEffect(() => {
    if (selectedRange[0]) {
      setValue("start_date", selectedRange[0].format("YYYY-MM-DD"));
    }
    if (selectedRange[1]) {
      setValue("end_date", selectedRange[1].format("YYYY-MM-DD"));
    }
  }, [selectedRange, setValue]);

  const onSubmit = handleSubmit((data) => {
    const params = { ...Params(50, 0) };
    dispatch(OperationTypesAPI.getOperationTypes({ ...data, ...params }));
  });

  return (
    <>
      <TimeFilter
        control={control}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};

export default Filter;
