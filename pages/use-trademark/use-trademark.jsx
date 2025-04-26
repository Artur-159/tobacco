import { useNavigate } from "react-router-dom";
import List from "./components/list/list";
import CreateBtn from "../../components/create-btn/create-btn";
import PageTitle from "../../components/page-title/page-title";
import PermissionGuard from "../../hoc/permission-guard/permission-guard";
import Search from "../../components/search/search";
import { UseTrademarkAPI } from "../../services/use-trademark";
import Params from "../../helpers/params";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";

const UseTrademark = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { offset } = useSelector((state) => state.pagination);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const navigateToCreate = () => {
    navigate("create");
  };

  const handleSearch = handleSubmit((data) => {
    const params = { ...Params(20, offset), ...data };
    dispatch(UseTrademarkAPI.getAll(params));
  });

  return (
    <>
      <PageTitle title="Ապրանքային նշանի օգտագործում" />
      <div className={styles.top_block}>
        <PermissionGuard>
          <CreateBtn
            onClick={navigateToCreate}
            text="Ավելացնել նոր ապրանքային նշանի օգտագործում"
          />
        </PermissionGuard>
        <Search
          name="search"
          control={control}
          onSearch={handleSearch}
          className={styles.search}
        />
      </div>
      <List offset={offset} />
    </>
  );
};

export default UseTrademark;
