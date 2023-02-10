import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import theme from "../../../theme";
import { drawerMenuItems } from "../../aux/navigationItems";

import { useAppSelector } from "../../../store/storeHooks";

//id
//anchor menu

interface PropsMainDrawer {
  isOpen: boolean;
  toggleHandler: (isOpen: boolean) => void;
}

const MainDrawerMenu: React.FC<PropsMainDrawer> = ({
  isOpen,
  toggleHandler,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const currentLocation = useLocation();
  const { isAuthenticated } = useAppSelector(
    (state) => state.autheticationReducer
  );
  // Responsive swipe on mobile
  useEffect(() => {}, [isSelected, setIsSelected, currentLocation]);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      sx={{}}
      anchor='left'
      open={isOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      onClose={() => {
        toggleHandler(false);
      }}
      onOpen={() => {
        toggleHandler(true);
      }}>
      {isAuthenticated && (
        <List
          sx={{
            width: "250px",
            padding: "4em 0 0 0",
          }}>
          {drawerMenuItems.slice(0, 5).map((item, index) => (
            <ListItem key={`${item.itemName}-${index}`} disablePadding>
              <ListItemButton
                component={Link}
                disabled={item.path === currentLocation.pathname}
                sx={{
                  "&.Mui-selected": {
                    background: `rgba(134, 134, 134, 0.3)`,
                  },
                  "&.Mui-disabled": {
                    background: `rgba(134, 134, 134, 0.3)`,
                    color: theme.palette.common.black,
                    opacity: "1",
                    fontWeight: "bold",
                  },
                }}
                to={item.path}
                onClick={() => {
                  toggleHandler(false);
                }}
                selected={item.path === currentLocation.pathname}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText>{item.itemName}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {isAuthenticated && <Divider />}
      <List
        sx={{
          width: "250px",
          padding: `${!isAuthenticated ? "4em" : "0"} 0 0 0`,
        }}>
        {drawerMenuItems.slice(-2).map((item, index) => (
          <ListItem key={`${item.itemName}-${index}`} disablePadding>
            <ListItemButton
              component={Link}
              disabled={item.path === currentLocation.pathname}
              sx={{
                "&.Mui-selected": {
                  background: `rgba(134, 134, 134, 0.3)`,
                },
                "&.Mui-disabled": {
                  background: `rgba(134, 134, 134, 0.3)`,
                  color: theme.palette.common.black,
                  opacity: "1",
                  fontWeight: "bold",
                },
              }}
              to={item.path}
              onClick={() => {
                toggleHandler(false);
              }}
              selected={item.path === currentLocation.pathname}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText>{item.itemName}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default MainDrawerMenu;
