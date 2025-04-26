import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../../../../components/forms/operations/form";
import { validation } from "../validation/validation";
import { OperationsAPI } from "../../../../services/operations";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import {
  setClearErrorAction,
  setStatus,
} from "../../../../store/operations/slice";
import { useTrademarkObjectionId } from "../../../../hooks/useTrademarkObjectionId";

const CreateOperation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trademarkObjectionId = useTrademarkObjectionId();
  const listFile = useSelector((state) => state.file.listFile);
  const { status, errorStatus, trademarkObjectionList } = useSelector(
    (state) => state.operations
  );

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      trademark_objection_id: trademarkObjectionId,
      operation_type: null,
      description: "",
      amount: "",
      currency: null,
      file: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    if (Array.isArray(data.file)) {
      data.file = listFile[0].file;
    }

    const selectedData = trademarkObjectionList.find(
      (item) => item.id === data.trademark_objection_id
    );

    if (selectedData) {
      data[selectedData.type] = selectedData.id.split("-")[1];
      delete data.trademark_objection_id;
    }

    dispatch(OperationsAPI.postOperation(data))
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
      dispatchActions: [{ action: dispatch, payload: setStatus() }],
    });
  }, [status, errorStatus, dispatch, navigate]);

  return <Form control={control} errors={errors} onSubmit={onSubmit} />;
};

export default CreateOperation;
