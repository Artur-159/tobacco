import { useCallback, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { AuthorizationAPI } from "../../services/authorization";
import { getRoutes } from "../../utils/get-routes";
import useOutsideClick from "../../hooks/useOutsideClick";

import styles from "./styles.module.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebarRef = useRef(null);
  const token = localStorage.getItem("token");
  const adminRole = localStorage.getItem("adminRole");

  const [isOpen, setIsOpen] = useState(false);

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

  const routes = useMemo(() => getRoutes(adminRole, token), [adminRole, token]);

  useOutsideClick(sidebarRef, () => setIsOpen(false));

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <nav
      ref={sidebarRef}
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.sidebar_inner}>
        <header className={styles.sidebar_header}>
          <button
            type="button"
            onClick={toggleSidebar}
            className={styles.sidebar_burger}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </header>

        <nav className={styles.sidebar_menu}>
          {routes.map((item) => {
            if (item.path === "/city") {
              return null;
            }

            return (
              <ul key={item.path}>
                <NavLink
                  to={item.path}
                  title={item.name}
                  className={({ isActive }) =>
                    `${styles.sidebar_button} ${isActive ? styles.active : ""}`
                  }
                  onClick={item.name === "Դուրս գալ" ? handleLogout : undefined}
                >
                  <img src={item.icon} alt={item.name} width={24} height={24} />
                  <p className={styles.item_name}>{item.name}</p>
                  {item.children?.map((child) => {
                    return child.name ? (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `${styles.sidebar_button} ${
                              isActive ? styles.active : ""
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      </li>
                    ) : null;
                  })}
                </NavLink>
              </ul>
            );
          })}
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
