import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HEADER_DROPDOWN } from "../../constant/header-dropdown";
import { AuthorizationAPI } from "../../services/authorization";
import useOutsideClick from "../../hooks/useOutsideClick";

import styles from "./styles.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const checkboxRef = useRef(null);

  const { personalName } = useSelector((state) => state.authorization);

  const isAuthenticated = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = useCallback(() => {
    dispatch(AuthorizationAPI.postLogout())
      .unwrap()
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }, [dispatch, navigate]);

  useOutsideClick(dropdownRef, () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  });

  return (
    <header className={styles.header}>
      <Link to={isAuthenticated ? "/home" : "/login"}>
        <img
          width={110}
          alt="Tobacco brand logo"
          src="/images/header-logo.png"
        />
      </Link>
      {isAuthenticated && (
        <div className={styles.dropdown_block} ref={dropdownRef}>
          <input
            type="checkbox"
            ref={checkboxRef}
            id="dropdown-toggle"
            className={styles.dropdown_checkbox}
          />
          <label htmlFor="dropdown-toggle" className={styles.icon}>
            <img
              alt="Personal Center"
              src="/icons/personal.svg"
              className={styles.personal_img}
            />
            <span>{personalName ? personalName : userName}</span>
            <img
              src="/icons/down.svg"
              alt="dropdown arrow down"
              className={styles.down_icon}
            />
          </label>
          <ul className={styles.drop_menu}>
            {HEADER_DROPDOWN.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  onClick={item.link === "/login" ? handleLogout : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
