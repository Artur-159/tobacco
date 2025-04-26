import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import MainButton from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Params from "../../helpers/params";
import { CityAPI } from "../../services/city";
import Pagination from "../../components/pagination/pagination";
import PageTitle from "../../components/page-title/page-title";
import { setPage } from "../../store/pagination/slice";

import styles from "./styles.module.scss";

const Info = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { offset } = useSelector((state) => state.pagination);
  const { mostUsedCountries, countriesTotal } = useSelector(
    (state) => state.city
  );

  const BASE_URL = process.env.REACT_APP_BASE_URL_IMG;

  const navigateHandler = () => {
    navigate("/city");
  };

  useEffect(() => {
    dispatch(CityAPI.getMostUsedCities(Params(20, offset * 20)))
      .unwrap()
      .catch((error) => console.error("API Error:", error));
  }, [dispatch, offset]);

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Այլ տեղեկություններ" />
      <MainButton
        onClick={navigateHandler}
        variant="contained"
        startIcon={<Add />}
      >
        Ավելացնել նոր Երկիր
      </MainButton>
      <br />
      <h2 className={styles.list_title}>Գրանցված ապրանքանիշերը ըստ երկրների</h2>

      {mostUsedCountries?.length ? (
        mostUsedCountries.map((country, i) => (
          <div key={country.id} className={styles.list}>
            <div className={styles.info}>
              <div className={styles.inner_block}>
                <div>{offset * 20 + i + 1}</div>
                <img
                  width={30}
                  height={26}
                  alt={country?.name}
                  className={styles.img}
                  src={
                    country?.image
                      ? `${BASE_URL}${country?.image}`
                      : `${process.env.PUBLIC_URL}/images/no-image.svg`
                  }
                />
                <div>{country?.name}</div>
              </div>
              <div className={styles.count}>{country?.usage_count}</div>
            </div>
          </div>
        ))
      ) : (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      )}
      <Pagination offset={offset} total={countriesTotal} />
    </>
  );
};

export default Info;
