import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import Form from "../../../../components/forms/common/doc_and_operation/form";
import { DocTypeAPI } from "../../../../services/doc-type";
import {
  setClearErrorAction,
  setStatus,
} from "../../../../store/doc-types/slice";
import { handleResponseStatus } from "../../../../utils/handle-response-status";

const CreateDocType = () => {
  const dispatch = useDispatch();

  const { status, errorStatus } = useSelector((state) => state.docType);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: { doc_type: "" },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(DocTypeAPI.postDocType(data));
    reset();
  });

  useEffect(() => {
    dispatch(DocTypeAPI.getDocTypes());
  }, [dispatch, status]);

  useEffect(() => {
    handleResponseStatus({
      status: status !== "DELETED" ? status : null,
      errorStatus,
      navigate: null,
      navigatePath: null,
      errorMessage: errorStatus,
      successMessage: "Հաջողությամբ ստեղծված է",
      clearErrorAction: () => dispatch(setClearErrorAction()),
      dispatchActions: [{ action: dispatch, payload: setStatus(null) }],
    });
  }, [status, errorStatus, dispatch]);

  return (
    <Form
      errors={errors}
      name="doc_type"
      control={control}
      onSubmit={onSubmit}
      placeholder="Փաստաթղթի տեսակ"
    />
  );
};

export default CreateDocType;
