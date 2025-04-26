import Sidebar from "../sidebar/sidebar";
import styles from "./styles.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.children}> {children} </div>
    </div>
  );
};

export default Layout;
