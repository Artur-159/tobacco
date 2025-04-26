/**
 * Returns the corresponding CSS class name based on the document type.
 *
 * @param {string|null} doc_type - The type of the document.
 * @returns {string} The class name associated with the given document type.
 *                   Returns "green" for "Գրանցման որոշում",
 *                   "blue" for "Գրանցման վկայագիր",
 *                   "red" for "Որոշում ապրանքային նշանի գրանցումը մերժելու մասին",
 *                   "grey" for null, and "black" for any other document type.
 */

import styles from "../pages/ledger-docs/styles.module.scss";

export const getClassByDocType = (doc_type) => {
  switch (doc_type) {
    case "Գրանցման որոշում":
      return styles.green;
    case "Գրանցման վկայագիր":
      return styles.blue;
    case "Որոշում ապրանքային նշանի գրանցումը մերժելու մասին":
      return styles.red;
    case null:
      return styles.grey;
    default:
      return styles.black;
  }
};
