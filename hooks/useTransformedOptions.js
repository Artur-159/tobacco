import { useMemo } from "react";
import { SelectOption } from "../utils/select-options";

export const useTransformedOptions = (decision_docs, entityList, list) => {
  const optionsCities = useMemo(() => SelectOption(list), [list]);

  const transformedData = useMemo(
    () =>
      decision_docs?.map((item) => ({
        value: item.id,
        label: item.file.path.split("/").pop(),
      })) || [],
    [decision_docs]
  );

  const optionsEntity = useMemo(() => {
    if (!entityList?.id) return null;
    return {
      label: `${entityList?.trade_mark_name} - ${entityList?.trade_mark_armenian_name}`,
      value: entityList.id,
    };
  }, [entityList]);

  return { optionsCities, transformedData, optionsEntity };
};
