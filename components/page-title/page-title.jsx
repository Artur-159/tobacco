import clsx from "clsx";
import styles from "./styles.module.scss";

const PageTitle = ({ title, className }) => {
  return <h1 className={clsx(styles.title, className)}>{title}</h1>;
};

export default PageTitle;
