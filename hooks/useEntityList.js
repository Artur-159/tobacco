import { useMemo } from "react";

const useEntityList = (entityRoute, oneTradeMark, oneObjection) => {
  return useMemo(() => {
    return entityRoute === "trademark" ? oneTradeMark : oneObjection;
  }, [entityRoute, oneTradeMark, oneObjection]);
};
export default useEntityList;
