import PageTitle from "../../components/page-title/page-title";
import PermissionGuard from "../../hoc/permission-guard/permission-guard";
import CreateOperation from "./components/create/create";
import List from "./components/list/list";

import styles from "./styles.module.scss";

const Operations = () => {
  return (
    <div className={styles.wrapper}>
      <PageTitle className={styles.title} title="Գործառնություններ" />
      <PermissionGuard>
        <CreateOperation />
      </PermissionGuard>
      <List />
    </div>
  );
};

export default Operations;
