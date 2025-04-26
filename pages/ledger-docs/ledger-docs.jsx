import PageTitle from "../../components/page-title/page-title";
import PermissionGuard from "../../hoc/permission-guard/permission-guard";
import CreateLedgerDoc from "./components/create/create";
import DocsList from "./components/docs-list/docs-list";

import styles from "./styles.module.scss";

const LedgerDocs = () => {
  return (
    <div className={styles.wrapper}>
      <PageTitle className={styles.title} title="Փաստաթղթերի մատյան" />
      <PermissionGuard>
        <CreateLedgerDoc />
      </PermissionGuard>
      <DocsList />
    </div>
  );
};

export default LedgerDocs;
