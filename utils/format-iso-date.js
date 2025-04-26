/**
 * Format a given ISO date string into a German date string (DD.MM.YYYY)
 * @param {string} isoDate - The ISO date string to format
 * @returns {string} The formatted date string
 */

const formatIsoDate = (isoDate) => {
  if (!isoDate) return "";
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(isoDate).toLocaleDateString("de-DE", options);
};

export { formatIsoDate };
