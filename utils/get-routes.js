import {
  superRouters,
  subRoutes,
  userRouters,
  guestRoutes,
  notRegisterRoutes,
} from "../router/page-routes";

export const getRoutes = (adminRole, token) => {
  if (!adminRole || !token) {
    return notRegisterRoutes;
  }

  switch (String(adminRole)) {
    case "4":
      return superRouters;
    case "3":
      return subRoutes;
    case "2":
      return userRouters;
    case "1":
      return guestRoutes;
    default:
      return notRegisterRoutes;
  }
};
