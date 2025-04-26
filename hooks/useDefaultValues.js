import { useMemo } from "react";

const useDefaultValues = (oneAttachTradeMark, oneAttachObjection) => {
  return useMemo(() => {
    const data = oneAttachTradeMark || oneAttachObjection;
    if (!data) return { country: "", ledger_doc: "", trade_mark: "" };

    return {
      country: data.country ? data.country.id : "",
      ledger_doc: data.ledger_doc ? data.ledger_doc.id : "",
      trade_mark: data.trade_mark ? data.trade_mark.id : "",
    };
  }, [oneAttachTradeMark, oneAttachObjection]);
};

export default useDefaultValues;
