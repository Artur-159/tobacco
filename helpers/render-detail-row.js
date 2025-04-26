/**
 * Returns a div element with a label and its value in a Detail component.
 * The value is passed through getDisplayValue to ensure it is displayed
 * correctly, and the label is displayed with a colon after it.
 * @param {string} label The label to be displayed.
 * @param {Object|string} value The value to be displayed.
 * @returns {Object} A JSX element representing a row in the Detail component.
 */

import { getDisplayValue } from "../utils/get-display-value";
import styles from "../pages/objections/styles.module.scss";

export const renderDetailRow = (label, value) => (
  <div className={styles.row} key={label}>
    <span>{label}:</span>
    <span>{getDisplayValue(value, "N/A")}</span>
  </div>
);
