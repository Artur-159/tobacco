export const getTrademarkObjectionId = (queryParams) => {
  return queryParams.get("TM")
    ? `TM-${queryParams.get("TM")}`
    : `OB-${queryParams.get("OB")}`;
};
