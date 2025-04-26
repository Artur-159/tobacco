import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ObjectionsAPI } from "../../../../services/objections";
import { setModalOpen } from "../../../../store/modal/slice";
import MainSelect from "../../../../components/main-select/main-select";
import Button from "../../../../components/button/button";

import styles from "../../styles.module.scss";

const DownloadFile = ({ modalId, offset }) => {
  const dispatch = useDispatch();

  const { filter } = useSelector((state) => state.objections);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      pdf_image: "",
      print: "pdf",
      page_pdf_info: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    data = { ...data };
    data.offset = offset;
    data.limit = 20;
    if (filter) {
      const paramsWithFilter = { ...filter, ...data };
      dispatch(ObjectionsAPI.getObjections({ ...paramsWithFilter }));
    } else {
      dispatch(ObjectionsAPI.getObjections({ ...data }));
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
        options={[
          { value: 1, label: "Այո" },
          { value: 0, label: "Ոչ" },
        ]}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
      <MainSelect
        className={styles.pdf_select}
        control={control}
        name="page_pdf_info"
        placeholder="Ապրանքային նշանների ցանկը"
        options={[
          { value: "a_page", label: "Ընթացիկ էջը" },
          { value: "full_page", label: "Ամբողջ ցանկը" },
        ]}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
      <Button className={styles.pdf_btn} variant="outlined" onClick={onSubmit}>
        Հաստատել
      </Button>
    </div>
  );
};

export default DownloadFile;
