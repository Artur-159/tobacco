import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { OperationTypesAPI } from "../../../../services/operation-types";
import Form from "../../../../components/forms/common/doc_and_operation/form";
import { handleResponseStatus } from "../../../../utils/handle-response-status";
import { setClearErrorAction } from "../../../../store/operation-types/slice";

const CreateOperationType = () => {
  const dispatch = useDispatch();
  const { status, errorStatus } = useSelector((state) => state.operationTypes);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: { operation_type: "" },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(OperationTypesAPI.postOperationType(data));
    reset();
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
      dispatchActions: [{ action: dispatch, payload: setClearErrorAction() }],
    });
  }, [status, errorStatus, dispatch]);

  return (
    <Form
      errors={errors}
      control={control}
      onSubmit={onSubmit}
      name="operation_type"
      placeholder="Գործառնության տեսակ"
    />
  );
};

export default CreateOperationType;
