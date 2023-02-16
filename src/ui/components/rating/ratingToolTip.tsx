import React from "react";
import { Menu, Grid, Box, Rating, Typography } from "@mui/material";

interface PropsToolTipMenu {
  openMenu: boolean;
  anchorElement: HTMLElement | null;
  handleClose: () => void;
}
//id
//anchor menu

const RatingToolTip: React.FC<PropsToolTipMenu> = ({
  openMenu,
  anchorElement,
  handleClose,
}) => {
  return (
    <Menu
      anchorEl={anchorElement}
      id='toolTip_rating'
      open={openMenu}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
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
      <Grid direction='column' container>
        <Grid item>
          <Grid container gap={1} alignContent='center' alignItems='center'>
            <Grid item>
              <Typography component='legend'>your rating </Typography>
            </Grid>
            <Grid item>
              <Rating
                sx={{ paddingTop: "5px" }}
                name='read-only'
                value={3}
                size='small'
                readOnly
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Menu>
  );
};

export default RatingToolTip;
