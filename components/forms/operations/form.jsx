import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MainSelect from "../../main-select/main-select";
import Textarea from "../../textarea/textarea";
import UploadFile from "../../uploads/file/file";
import { SelectOption } from "../../../utils/select-options";
import MainButton from "../../button/button";
import { CURRENCY } from "../../../constant/operations";
import TextInput from "../../text-input/text-input";
import { OperationTypesAPI } from "../../../services/operation-types";
import { OperationsAPI } from "../../../services/operations";
import { setStatus } from "../../../store/operations/slice";
import { transformData } from "../../../utils/transform-data";

import styles from "../../../pages/operations/styles.module.scss";

const Form = ({ control, errors, onSubmit }) => {
  const dispatch = useDispatch();
  const { status, trademarkObjectionList } = useSelector(
    (state) => state.operations
  );
  const operationTypes = useSelector((state) => state.operationTypes.list);
  const operationTypesOption = SelectOption(operationTypes, "operation_type");
  const tradeMarksOption = transformData(trademarkObjectionList);

  useEffect(() => {
    dispatch(OperationTypesAPI.getOperationTypes());
    dispatch(OperationsAPI.getTrademarkObjectionList());
    dispatch(setStatus(false));
  }, [dispatch, status]);

  return (
    <div className={styles.form}>
      <MainSelect
        control={control}
        placeholder="Ապրանքանիշ / Առարկություն"
        options={tradeMarksOption}
        name="trademark_objection_id"
        error={errors.trademark_objection_id?.message}
      />
      <MainSelect
        control={control}
        name="operation_type"
        options={operationTypesOption}
        placeholder="Գործառնության տեսակ"
        error={errors.operation_type?.message}
      />
      <Textarea
        rows={8}
        control={control}
        name="description"
        placeholder="Նկարագրություն"
        error={errors.description?.message}
      />
      <div className={styles.amount}>
        <TextInput
          size="small"
          type="number"
          name="amount"
          control={control}
          placeholder="Պահանջվող գումար"
          error={errors.doc_type?.message}
        />
        <MainSelect
          name="currency"
          control={control}
          options={CURRENCY}
          isSearchable={false}
          placeholder="Արժույթ"
          error={errors.doc_type_id?.message}
        />
      </div>
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
