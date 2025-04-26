import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TradeMarkAPI } from "../../../../services/trademark";
import { setModalOpen } from "../../../../store/modal/slice";
import MainSelect from "../../../../components/main-select/main-select";
import Button from "../../../../components/button/button";
import { DOWNLOAD_SELECT_OPTIONS } from "../../../../constant/trademark";

import styles from "../../styles.module.scss";

const DownloadFile = ({ modalId, offset }) => {
  const dispatch = useDispatch();

  const { filter } = useSelector((state) => state.tradeMark);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      pdf_image: "",
      page_pdf_info: "",
      print: "pdf",
    },
  });

  const onSubmit = handleSubmit((data) => {
    data.offset = offset;
    data.limit = 20;

    if (filter) {
      const paramsWithFilter = { ...filter, ...data };
      dispatch(TradeMarkAPI.getTradeMarks({ ...paramsWithFilter }));
    } else {
      dispatch(TradeMarkAPI.getTradeMarks({ ...data }));
    }

    dispatch(setModalOpen({ modalId, isOpen: false }));
  });

  return (
    <div>
      <h2>Արտածել PDF</h2>
      <MainSelect
        className={styles.pdf_select}
        control={control}
        name="pdf_image"
        placeholder="Նկարի առկայություն"
        options={DOWNLOAD_SELECT_OPTIONS}
      ></MainSelect>
      <MainSelect
        className={styles.pdf_select}
        control={control}
        name="page_pdf_info"
        placeholder="Ապրանքային նշանների ցանկը"
        options={[
          { value: "a_page", label: "Ընթացիկ էջը" },
          { value: "full_page", label: "Ամբողջ ցանկը" },
        ]}
      />
      <Button className={styles.pdf_btn} variant="outlined" onClick={onSubmit}>
        Հաստատել
      </Button>
    </div>
  );
};

export default DownloadFile;
