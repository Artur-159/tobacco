import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const useActionHandlers = (entity, API, actions) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return {
    create: () => navigate("create"),
    edit: (id) => navigate(`${id}`),
    delete: (id, modalId) => {
      dispatch(API[`${actions.deleteEntity}`](id));
      dispatch(actions.setDeletedEntityId(id));

      if (modalId) {
        dispatch(actions.setModalOpen({ modalId, isOpen: false }));
      }
      dispatch(actions.setModalOpen(false));
    },
    navigateToDetail: (id) => navigate(`detail/${id}`),
    navigateToLedgerDocs: (id) => navigate(`/ledger-docs?${entity}=${id}`),
    navigateToOperations: (id) => navigate(`/operations?${entity}=${id}`),
    navigateAttachCountry: (id) => navigate(`attach-country/${id}`),
  };
};

export default useActionHandlers;
