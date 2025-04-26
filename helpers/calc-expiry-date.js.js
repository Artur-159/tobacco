/**
 * Calculate an expiration date from the current date by adding the given number of days
 * @param {number} days - The number of days to add to the current date
 * @returns {string} - The expiration date in UTC format
 */

const calcExpiryDate = (days) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime());
  futureDate.setDate(futureDate.getDate() + days);

  return futureDate.toUTCString();
};

export default calcExpiryDate;
