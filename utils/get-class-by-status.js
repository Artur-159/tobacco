import styles from "../pages/trademark/components/item/styles.module.scss";

export const getClassByStatus = (status) => {
  status = status.toLowerCase();

  switch (status) {
    case "գրանցմանը սպասող":
      return styles.green;
    case "գործող":
      return styles.black;
    case "գործող, անժամկետ":
      return styles.black;
    case "ժամկետանց":
      return styles.red;
    case "մերժված":
      return styles.red;
    default:
      return styles.black;
  }
};
