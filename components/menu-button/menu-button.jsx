import { useState } from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MenuButton = ({ children, className }) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  return (
    <div className={clsx(className)}>
      <IconButton
        aria-label="more"
        id="menu-button"
        aria-controls={open ? "menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
        anchorEl={anchor}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5 + "px",
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {children}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
