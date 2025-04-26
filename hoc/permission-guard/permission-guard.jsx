/**
 * HOC which wraps children in a conditional block, only showing
 * the children if the adminRole is not 1 or 2.
 *
 * @param {object} props
 * @param {ReactNode} props.children
 * @returns {ReactNode}
 */
const PermissionGuard = ({ children }) => {
  let adminRole = localStorage.getItem("adminRole");
  adminRole = adminRole ? Number(adminRole) : null;

  if (!adminRole || adminRole === 1 || adminRole === 2) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
