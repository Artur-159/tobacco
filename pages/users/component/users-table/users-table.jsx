import { useEffect, useMemo, memo } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import clsx from "clsx";
import { AuthorizationAPI } from "../../../../services/authorization";
import { setModalOpen } from "../../../../store/modal/slice";
import Params from "../../../../helpers/params";
import Pagination from "../../../../components/pagination/pagination";
import RoleInfo from "../role-info/role-info";
import {
  setDeleteUserId,
  setErrorStatus,
  setOffset,
  setStatus,
} from "../../../../store/authorization/slice";
import ItemActions from "../../../../components/item-actions/item-actions";
import useActionHandlers from "../../../../hooks/useActionHandlers";
import { handleResponseStatus } from "../../../../utils/handle-response-status";

import styles from "./styles.module.scss";

const UserTable = ({
  list,
  subTitle,
  className,
  status,
  errorStatus,
  totalUsers,
  userRole,
  offset,
}) => {
  const dispatch = useDispatch();
  const ACTION_HANDLERS = useActionHandlers("", AuthorizationAPI, {
    setDeletedEntityId: setDeleteUserId,
    setModalOpen,
    deleteEntity: "deleteAdmin",
  });

  const options = useMemo(() => {
    const params = Params(6);
    params.offset = offset * 6;
    params.filter_role = userRole;
    return params;
  }, [userRole, offset]);

  useEffect(() => {
    dispatch(AuthorizationAPI.getUsersList(options));
    dispatch(setOffset(options.offset));
  }, [dispatch, status, userRole, offset, options]);

  useEffect(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [{ action: dispatch, payload: setStatus(null) }],
      successMessage: "Հաջողությամբ հեռացված է",
      errorMessage: errorStatus,
      clearErrorAction: () => dispatch(setErrorStatus()),
    });
  }, [status, errorStatus, dispatch]);

  const memoizedSubTitle = useMemo(() => subTitle, [subTitle]);
  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className={clsx(className)}>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {memoizedSubTitle?.map((item, i) => (
                  <TableCell
                    key={i}
                    align={item === "Delete user" ? "right" : "left"}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {memoizedList?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={styles.th_index} align="left">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {row?.name} {row?.surname}
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                  <TableCell align="left">
                    {row?.partner_company_name}
                  </TableCell>
                  <TableCell align="left">
                    <RoleInfo defaultValue={row.role} id={row.id} />
                  </TableCell>

                  <TableCell align="center">
                    {row?.is_blocked === 0 ? (
                      <div className={styles.active}>✓</div>
                    ) : (
                      <div className={styles.blocked}>✗</div>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <ItemActions
                      id={row.id}
                      className={styles.menu}
                      handlers={ACTION_HANDLERS}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination offset={offset} total={totalUsers} pageCount={6} />
      </Paper>
    </div>
  );
};

export default memo(UserTable);
