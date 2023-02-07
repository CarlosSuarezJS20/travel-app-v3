import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { profileMenuToolTipItems } from "./aux/menuItemsforTooltipNavMenu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface PropsToolTipMenu {
  anchorId: string;
  openMenu: boolean;
  anchorElement: HTMLElement | null;
  handleClose: () => void;
}
//id
//anchor menu

const ToolTipMenu: React.FC<PropsToolTipMenu> = ({
  anchorId,
  openMenu,
  anchorElement,
  handleClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const currentLocation = useLocation();

  useEffect(() => {
    switch (currentLocation.pathname) {
      case "/my-trips":
        if (selectedIndex != 1) {
          setSelectedIndex(1);
        }
        break;
      case "/my-wishlist":
        if (selectedIndex != 2) {
          setSelectedIndex(2);
        }
        break;
      default:
        break;
    }
    return () => {
      // cleans the index when user is redirected to profile page
      if (
        currentLocation.pathname === "/my-profile" ||
        (currentLocation.pathname === "search-travel" && selectedIndex != null)
      ) {
        setSelectedIndex(null);
        console.log(selectedIndex);
      }
    };
  }, [currentLocation, selectedIndex, setSelectedIndex]);

  let menuItems;

  if (anchorId === "travel Profile") {
    menuItems = profileMenuToolTipItems;
  }

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Menu
      anchorEl={anchorElement}
      id={anchorId}
      open={openMenu}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: 0,
        //Styling with the edge at the top right
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}>
      {menuItems?.map((item, i) => {
        return (
          <MenuItem
            selected={i === selectedIndex}
            sx={{
              "&.Mui-selected": {
                background: "red",
              },
            }}
            component={Link}
            to={item.path}
            key={`${item}-${i}`}
            onClick={() => handleMenuItemClick(i)}>
            {item.itemName}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ToolTipMenu;
