import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./store/authorization/slice";
import Layout from "./components/layout/layout";
import MainRoutes from "./router/main-router";
import Header from "./components/header/header";
import { LicenseInfo } from "@mui/x-license";

import "react-toastify/dist/ReactToastify.min.css";

LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminRole = localStorage.getItem("adminRole");

    if (token && adminRole) {
      dispatch(setIsAuthenticated({ token, adminRole }));
    }
  }, [dispatch]);

  return (
    <Layout>
      <Header />
      <div className="main_container">
        <MainRoutes />
      </div>
    </Layout>
  );
};

export default App;
