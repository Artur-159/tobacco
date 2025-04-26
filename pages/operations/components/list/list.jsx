import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { setModalOpen } from "../../../../store/modal/slice";
import { OperationsAPI } from "../../../../services/operations";
import { GET_OPERATIONS_THEAD } from "../../../../utils/get-thead";
import { useForm } from "react-hook-form";
import Search from "../../../../components/search/search";
import MainButton from "../../../../components/button/button";
import Filter from "../filter/filter";
import Params from "../../../../helpers/params";
import { Paper } from "@mui/material";
import { useTrademarkObjectionId } from "../../../../hooks/useTrademarkObjectionId";
import { setPage } from "../../../../store/pagination/slice";
import Pagination from "../../../../components/pagination/pagination";
import Toast from "../../../../helpers/status-text";

import styles from "./styles.module.scss";

const OperationsTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const filterRef = useRef(null);
  const { offset } = useSelector((state) => state.pagination);
  const { list, status, total } = useSelector((state) => state.operations);

  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("start_date");
  const endDate = queryParams.get("end_date");

  const [showFilter, setShowFilter] = useState(false);
  const [sortModel, setSortModel] = useState(null);

  const isShowTableData = useTrademarkObjectionId();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const deleteHandler = (id, modalId) => {
    dispatch(OperationsAPI.deleteOperation(id))
      .unwrap()
      .then(() => {
        const params = { ...Params(50, offset * 50) };

        if (startDate && endDate) {
          params.start_date = startDate;
          params.end_date = endDate;
        }

        dispatch(OperationsAPI.getOperations(params));

        Toast.success("Հաջողությամբ հեռացված է ցանկից");
      })
      .catch((error) => {
        console.error("error", error);
      });
    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  const handleSearch = handleSubmit((data) => {
    const params = { ...Params(50, 0) };
    params.search = data.search;
    if (startDate && endDate) {
      params.start_date = startDate;
      params.end_date = endDate;
    }
    dispatch(OperationsAPI.getOperations(params));
  });

  const handleSortModelChange = (model) => {
    if (model.length > 0) {
      const { field, sort } = model[0];

      setSortModel({
        field,
        sort,
      });
    }
  };
  const openFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const params = { ...Params(50, offset * 50) };

    if (startDate && endDate) {
      params.start_date = startDate;
      params.end_date = endDate;
    }

    dispatch(OperationsAPI.getOperations(params));
  }, [dispatch, sortModel, status, offset, startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    !isShowTableData && (
      <>
        <div className={styles.head_item}>
          <MainButton
            variant="outlined"
            onClick={openFilter}
            className={styles.filter_btn}
          >
            Ֆիլտր
          </MainButton>
          <Search
            control={control}
            name="search"
            onSearch={handleSearch}
            className={styles.search}
          />
        </div>
        {showFilter && (
          <Paper sx={{ padding: 2, mb: 2 }} ref={filterRef}>
            <Filter setShowFilter={setShowFilter} />
          </Paper>
        )}

        <Paper elevation={3}>
          <DataGrid
            localeText={{ noRowsLabel: "Տվյալներ չկան" }}
            columns={GET_OPERATIONS_THEAD(deleteHandler)}
            onSortModelChange={handleSortModelChange}
            getRowHeight={() => "auto"}
            rows={list}
            disableColumnMenu
            hideFooter
          />
        </Paper>

        <Pagination offset={offset} total={total} pageCount={50} />
      </>
    )
  );
};

export default OperationsTable;
