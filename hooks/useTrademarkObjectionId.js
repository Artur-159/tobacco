import { useLocation } from "react-router-dom";

export const useTrademarkObjectionId = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const tmId = queryParams.get("TM");
  const obId = queryParams.get("OB");

  return tmId ? `TM-${tmId}` : obId ? `OB-${obId}` : null;
};
