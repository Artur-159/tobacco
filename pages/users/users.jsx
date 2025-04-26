import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { AuthorizationAPI } from "../../services/authorization";
import { setOffset, setUserRole } from "../../store/authorization/slice";
import { USERS_TABLE_SUBTITLE, ROLE_BUTTONS } from "../../constant/users";
import { setImageSlice, setListVideosImages } from "../../store/image/slice";
import Params from "../../helpers/params";
import Button from "../../components/button/button";
import UserTable from "./component/users-table/users-table";
import PageTitle from "../../components/page-title/page-title";
import Search from "../../components/search/search";

import styles from "./styles.module.scss";

const Users = () => {
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const adminRoleId = localStorage.getItem("adminRole");
  const { usersList, status, errorStatus, totalUsers, userRole } = useSelector(
    (state) => state.authorization
  );
  const { offset } = useSelector((state) => state.pagination);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSearch = handleSubmit((data) => {
    const params = Params(10, offset);
    const searchData = { ...params, ...data };

    if (userRole) {
      searchData.filter_role = userRole;
    }

    dispatch(AuthorizationAPI.getUsersList(searchData));
  });

  const handleRole = (selectedRole) => {
    dispatch(setOffset(0));
    setRole(selectedRole);
    dispatch(setUserRole(selectedRole));
  };

  useEffect(() => {
    let filter_role = userRole;
    let data = Params(6, offset * 6);
    data = { ...data, filter_role };
    dispatch(AuthorizationAPI.getUsersList(data));
    dispatch(setImageSlice(false));
    dispatch(setListVideosImages(false));
  }, [dispatch, userRole, offset]);

  return (
    <div className={styles.addAdmin}>
      <PageTitle title="Օգտատերեր" />
      <div className={styles.search_info}>
        <div className={styles.btn_list}>
          {ROLE_BUTTONS?.map((item) => (
            <Button
              key={item.value}
              onClick={() => handleRole(item.value)}
              variant={role === item.value ? "contained" : "outlined"}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className={styles.search}>
          <Search
            control={control}
            name="search"
            onSearch={onSearch}
            className={styles.search_inp}
          />
        </div>
        {adminRoleId === "4" ? (
          <Button className={styles.create_btn_link} variant={"outlined"}>
            <NavLink className={styles.create_user_link} to={"create_user"}>
              Ստեղծել նոր օգտատեր
            </NavLink>
          </Button>
        ) : null}
      </div>
      {!usersList?.length ? (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      ) : (
        <UserTable
          status={status}
          list={usersList}
          offset={offset}
          userRole={userRole}
          totalUsers={totalUsers}
          className={styles.table}
          errorStatus={errorStatus}
          subTitle={USERS_TABLE_SUBTITLE}
        />
      )}
    </div>
  );
};

export default Users;
