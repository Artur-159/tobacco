import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CityAPI } from "../services/city";
import { TradeMarkAPI } from "../services/trademark";
import { ObjectionsAPI } from "../services/objections";
import { LedgerDocsAPI } from "../services/ledger-docs";
import { AttachCountryAPI } from "../services/attach-country";

export const useEntityData = (
  entityRoute,
  getEditData,
  EditDataId,
  tradeMarkID,
  id
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CityAPI.getCities());

    if (entityRoute === "trademark") {
      if (getEditData) {
        dispatch(AttachCountryAPI.getOneAttachTradeMark(id));
        if (tradeMarkID) {
          dispatch(TradeMarkAPI.getOneTradeMark(tradeMarkID));
        }
      } else {
        dispatch(TradeMarkAPI.getOneTradeMark(id));
      }
      if (EditDataId) {
        dispatch(LedgerDocsAPI.getDecisionDocs({ trade_mark: EditDataId }));
      }
    } else if (getEditData) {
      dispatch(AttachCountryAPI.getOneAttachObjection(id));
    } else {
      dispatch(ObjectionsAPI.getObjections(id));
      dispatch(LedgerDocsAPI.getDecisionDocs({ objection: id }));
    }
  }, [dispatch, id, entityRoute, getEditData, tradeMarkID, EditDataId]);
};
