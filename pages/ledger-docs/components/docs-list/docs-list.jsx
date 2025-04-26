import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { LedgerDocsAPI } from "../../../../services/ledger-docs";
import { setId } from "../../../../store/ledger-docs/slice";
import { setModalOpen } from "../../../../store/modal/slice";
import { GET_LEDGER_DOCS_THEAD } from "../../../../utils/get-thead";
import Params from "../../../../helpers/params";
import Search from "../../../../components/search/search";
import Button from "../../../../components/button/button";
import Filter from "../filter/filter";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useTrademarkObjectionId } from "../../../../hooks/useTrademarkObjectionId";
import { setPage } from "../../../../store/pagination/slice";
import Pagination from "../../../../components/pagination/pagination";

import styles from "./styles.module.scss";
import Toast from "../../../../helpers/status-text";

const DocsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { offset } = useSelector((state) => state.pagination);
  const { list, total, status } = useSelector((state) => state.ledgerDocs);

  const filterRef = useRef(null);
  const [sortModel, setSortModel] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("start_date");
  const endDate = queryParams.get("end_date");

  const isShowTableData = useTrademarkObjectionId();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = handleSubmit((data) => {
    const params = { ...Params(50, 0) };
    params.search = data.search;
    if (startDate && endDate) {
      params.start_date = startDate;
      params.end_date = endDate;
    }
    dispatch(LedgerDocsAPI.getLedgerDocs(params));
  });

  const deleteHandler = (id, modalId) => {
    dispatch(LedgerDocsAPI.deleteLedgerDoc(id))
      .unwrap()
      .then(() => {
        dispatch(setId(id));
        Toast.success("Հաջողությամբ հեռացված է ցանկից");
      })
      .catch((error) => {
        console.error("error", error);
      });

    dispatch(setModalOpen({ modalId, isOpen: false }));
  };

  const handleSortModelChange = (model) => {
    if (model.length > 0) {
      const { field, sort } = model[0];
      setSortModel({
        field:
          field === "doc_type"
            ? field + "_id"
            : field === "trade_mark"
            ? field + "_id"
            : field,
        sort,
      });
    }
  };

  const openFilter = () => {
    setShowFilter(true);
  };

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
    const params = { ...Params(50, offset * 50) };

    if (startDate && endDate) {
      params.start_date = startDate;
      params.end_date = endDate;
    }

    dispatch(LedgerDocsAPI.getLedgerDocs(params));
  }, [dispatch, sortModel, offset, endDate, startDate, status]);

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    !isShowTableData && (
      <>
        <div className={styles.head_item}>
          <Button
            variant="outlined"
            onClick={openFilter}
            className={styles.filter_btn}
          >
            Ֆիլտր
          </Button>
          <Search
            control={control}
            name="search"
            onSearch={handleSearch}
            className={styles.search}
          />
        </div>

        {showFilter && (
          <Paper ref={filterRef} className={styles.filter_container}>
            <Filter setShowFilter={setShowFilter} />
          </Paper>
        )}

        <Paper elevation={3} sx={{ mb: 2 }}>
          <DataGrid
            hideFooter
            rows={list}
            disableColumnMenu
            getRowHeight={() => "auto"}
            onSortModelChange={handleSortModelChange}
            localeText={{ noRowsLabel: "Տվյալներ չկան" }}
            columns={GET_LEDGER_DOCS_THEAD(deleteHandler)}
          />
        </Paper>

        <Pagination offset={offset} total={total} pageCount={50} />
      </>
    )
  );
};

export default DocsList;
