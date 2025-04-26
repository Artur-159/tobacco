import List from "./components/list/list";
import CreateDocType from "./components/create/create";
import PageTitle from "../../components/page-title/page-title";

const DocType = () => {
  return (
    <>
      <PageTitle title="Փաստաթղթի տեսակ" />
      <CreateDocType />
      <List />
    </>
  );
};

export default DocType;
