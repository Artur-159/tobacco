import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useMemo } from "react";
import Home from "../pages/home/home";
import { getRoutes } from "../utils/get-routes";

const MainRoutes = () => {
  const adminRole = localStorage.getItem("adminRole");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !adminRole) {
      navigate("/login");
      localStorage.clear();
    }
  }, [token, adminRole, navigate]);

  const renderRoutes = (routes) =>
    routes?.flatMap((route) => [
      <Route key={route.path} path={route.path} element={route.element} />,
      ...(route?.children?.map((subRoute) => (
        <Route
          key={subRoute.path}
          path={subRoute.path}
          element={subRoute.element}
        />
      )) || []),
    ]);

  const routes = useMemo(() => getRoutes(adminRole, token), [adminRole, token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {renderRoutes(routes)}
        {token && <Route key="home" path="/home" element={<Home />} />}
        {/* if we need 404 page we can use this code below */}
        {/* <Route
        path="*"
        element={
          <h1 style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
          404 Page Not Found
          </h1>
          }
          /> */}
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
