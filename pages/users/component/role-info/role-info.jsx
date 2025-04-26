import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ROLE_OPTION } from "../../../../constant/users";

const RoleInfo = ({ defaultValue }) => {
  const [roleLabel, setRoleLabel] = useState("");

  useEffect(() => {
    const role = ROLE_OPTION.find((option) => option.value === defaultValue);
    setRoleLabel(role ? role.label : "No Role Selected");
  }, [defaultValue]);

  return <Box sx={{ width: 100 }}>{roleLabel}</Box>;
};

export default RoleInfo;
