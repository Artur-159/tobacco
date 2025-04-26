import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import Form from "../../../../components/forms/ledger-docs-form/form";
import { LedgerDocsAPI } from "../../../../services/ledger-docs";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import {
  setClearErrorAction,
  setStatusText,
} from "../../../../store/ledger-docs/slice";
import { useTrademarkObjectionId } from "../../../../hooks/useTrademarkObjectionId";

const CreateLedgerDoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trademarkObjectionId = useTrademarkObjectionId();
  const listFile = useSelector((state) => state.file.listFile);
  const { status, errorStatus, trademarkObjectionList } = useSelector(
    (state) => state.ledgerDocs
  );

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      trademark_objection_id: trademarkObjectionId,
      doc_type: null,
      description: "",
      file: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    const selectedData = trademarkObjectionList.find(
      (item) => item.id === data.trademark_objection_id
    );

    if (selectedData) {
      data[selectedData.type] = selectedData.id.split("-")[1];
      delete data.trademark_objection_id;
    }

    if (Array.isArray(data.file) && listFile.length > 0) {
      data.file = listFile[0]?.file || "";
    }

    dispatch(LedgerDocsAPI.postLedgerDoc(data))
      .unwrap()
      .then(() => {
        if (trademarkObjectionId) {
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          reset();
        }
      })
      .catch((error) => console.error("Failed to post ledger doc:", error));
  });

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      navigate: null,
      navigatePath: null,
      errorMessage: errorStatus,
      successMessage: "Հաջողությամբ ստեղծված է",
      clearErrorAction: () => dispatch(setClearErrorAction()),
      dispatchActions: [{ action: dispatch, payload: setStatusText() }],
    });
  }, [status, errorStatus, dispatch, navigate]);

  return <Form control={control} errors={errors} onSubmit={onSubmit} />;
};

export default CreateLedgerDoc;
