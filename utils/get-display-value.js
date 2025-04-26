/**
 * If the value is truthy, return the value. Otherwise return the placeholder.
 * @param {string} value The value to be returned if it is truthy.
 * @param {string} [placeholder='—'] The value to be returned if the value is falsy.
 * @returns {string} The value if it is truthy, otherwise the placeholder.
 */

export const getDisplayValue = (value, placeholder = "—") => {
  return value ? value : placeholder;
};
