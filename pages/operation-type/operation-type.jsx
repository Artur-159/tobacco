import List from "./components/list/list";
import CreateOperationType from "./components/create/create";
import PageTitle from "../../components/page-title/page-title";

const OperationType = () => {
  return (
    <>
      <PageTitle title="Գործառնության տեսակ" />
      <CreateOperationType />
      <List />
    </>
  );
};

export default OperationType;
