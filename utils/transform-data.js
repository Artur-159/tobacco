/**
 * Takes an array of objects and transforms them into an array of {value, label} pairs.
 * The label is determined by the type of the object. If the type is "trademark", the label
 * is the concatenation of the trade mark name and armenian name. If the type is "objection",
 * the label is the concatenation of the objection name and armenian name. If the type is
 * neither, the label is "Unknown type - <id>".
 * @param {Object[]} data
 * @return {Object[]}
 */

export const transformData = (data = [], showImage = false) => {
  return data?.map((item) => {
    const { id, type, image } = item;

    let label = `Unknown type - ${id}`;
    if (type === "trade_mark") {
      label = `${item.trade_mark_name} - ${item.trade_mark_armenian_name}`;
    } else if (type === "objection") {
      label = `${item.objection_name} - ${item.objection_armenian_name}`;
    }

    return showImage ? { value: id, label, image } : { value: id, label };
  });
};
