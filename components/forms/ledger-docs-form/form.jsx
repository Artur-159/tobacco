import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainSelect from "../../main-select/main-select";
import Textarea from "../../textarea/textarea";
import UploadFile from "../../uploads/file/file";
import { SelectOption } from "../../../utils/select-options";
import MainButton from "../../button/button";
import { DocTypeAPI } from "../../../services/doc-type";
import { setStatusText } from "../../../store/ledger-docs/slice";
import { LedgerDocsAPI } from "../../../services/ledger-docs";
import { transformData } from "../../../utils/transform-data";

import styles from "../../../pages/ledger-docs/styles.module.scss";

const Form = ({ control, errors, onSubmit }) => {
  const dispatch = useDispatch();

  const { status, trademarkObjectionList } = useSelector(
    (state) => state.ledgerDocs
  );
  const docTypes = useSelector((state) => state.docType.list);

  const docTypesOptions = SelectOption(docTypes, "doc_type");
  const trademarkObjectionOptions = transformData(trademarkObjectionList);

  useEffect(() => {
    dispatch(DocTypeAPI.getDocTypes());
    dispatch(LedgerDocsAPI.getTrademarkObjectionList());

    dispatch(setStatusText(false));
  }, [dispatch, status]);

  return (
    <div className={styles.form}>
      <MainSelect
        control={control}
        name="trademark_objection_id"
        options={trademarkObjectionOptions}
        placeholder="Ապրանքանիշ / Առարկություն"
        error={errors.trademark_objection_id?.message}
      />
      <MainSelect
        name="doc_type"
        control={control}
        placeholder="Փաստաթուղթ"
        options={docTypesOptions}
        error={errors.doc_type?.message}
      />
      <Textarea
        rows={8}
        control={control}
        name="description"
        placeholder="Նկարագրություն"
        error={errors.description?.message}
      />
      <p>Սքանավորված փաստաթուղթ</p>
      <UploadFile
        index={0}
        name="file"
        url="ledger-docs"
        control={control}
        title="Ներբեռնել փաստաթուղթ"
        error={errors.file?.message}
      />
      <MainButton
        type="submit"
        onClick={onSubmit}
        variant="contained"
        className={styles.submit_btn}
      >
        Ավելացնել
      </MainButton>
    </div>
  );
};

export default Form;
