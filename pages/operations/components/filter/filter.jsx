import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import dayjs from "dayjs";
import { OperationsAPI } from "../../../../services/operations";
import Params from "../../../../helpers/params";
import TimeFilter from "../../../../components/time-filter/time-filter";
import MainButton from "../../../../components/button/button";

import styles from "../../styles.module.scss";

const Filter = ({ setShowFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    dispatch(OperationsAPI.getOperations({ ...data, ...params }))
      .unwrap()
      .then(() => {
        const queryParams = new URLSearchParams({
          start_date: data.start_date,
          end_date: data.end_date,
        }).toString();

        navigate(`?${queryParams}`);
        setShowFilter(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <TimeFilter
        control={control}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <MainButton
        variant="outlined"
        className={styles.filter_submit_btn}
        onClick={onSubmit}
      >
        Հաստատել
      </MainButton>
    </>
  );
};

export default Filter;
