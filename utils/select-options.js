/**
 * Transforms an array of objects into an array of options with `label` and `value` properties.
 *
 * @param {Array} data - The array of objects to transform.
 * @param {string} [name='name'] - The key to use for the `label` property in the options.
 * @returns {Array} - An array of objects each containing `label` and `value` properties.
 */

export const SelectOption = (data = [], name = "name") =>
  data.map((item) => ({ label: item[name] || "", value: item.id || "" }));

export const getOptions = (name, optionsMap) => {
  return optionsMap[name] || [];
};
