import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CityAPI } from "../services/city";
import { TradeMarkAPI } from "../services/trademark";
import { ObjectionsAPI } from "../services/objections";
import { LedgerDocsAPI } from "../services/ledger-docs";

export const useGetAttachData = (entityRoute, id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CityAPI.getCities());

    if (entityRoute === "trademark") {
      dispatch(TradeMarkAPI.getOneTradeMark(id));
      dispatch(LedgerDocsAPI.getDecisionDocs({ trade_mark: id }));
    } else {
      dispatch(ObjectionsAPI.getObjection(id));
      dispatch(LedgerDocsAPI.getDecisionDocs({ objection: id }));
    }
  }, [dispatch, id, entityRoute]);
};
