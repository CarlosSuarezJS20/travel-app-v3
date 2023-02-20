import React, { useState } from "react";
import { Menu, Grid, Box, Rating, Typography } from "@mui/material";

interface PropsToolTipMenu {
  itemId: string;
  openMenu: boolean;
  anchorElement: HTMLElement | null;
  handleClose: () => void;
}
//add menu sign and style

const RatingToolTip: React.FC<PropsToolTipMenu> = ({
  itemId,
  openMenu,
  anchorElement,
  handleClose,
}) => {
  const [value, setValue] = useState<number | null>(null);
  const [userHasRated, setUserHasRated] = useState<boolean>(false);
  const [rateAgain, setRateAgain] = useState<boolean>(false);

  const onChangeRatingValueHandler = (value: number | null) => {
    if (rateAgain) {
      setRateAgain(false);
    }
    setValue(value);
  };

  return (
    <Menu
      anchorEl={anchorElement}
      id='toolTip_rating'
      open={openMenu}
      onClose={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
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
      <Grid direction='column' gap={1} container padding='0 1em'>
        <Grid item>
          <Grid container gap={1} alignContent='center' alignItems='center'>
            {userHasRated ? (
              <>
                <Grid item>
                  <Typography component='legend'>Your Rating: </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name='rating-controlled'
                    sx={{ paddingTop: "5px" }}
                    value={value}
                    size='small'
                    readOnly
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Typography component='legend'>Add Rating: </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name='rating-controlled'
                    sx={{ paddingTop: "5px" }}
                    value={value}
                    size='small'
                    onChange={(event, newValue) => {
                      onChangeRatingValueHandler(newValue);
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {userHasRated && (
          <>
            <Grid item alignSelf='center'>
              <Typography
                onClick={() => {
                  setRateAgain(true);
                }}>
                Rate again?
              </Typography>
            </Grid>
            <Grid item sx={{ display: rateAgain ? "block" : "none" }}>
              <Grid container>
                <Grid item>
                  <Typography component='legend'>Add Rating: </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name='rating-controlled'
                    sx={{ paddingTop: "5px" }}
                    value={value}
                    size='small'
                    onChange={(event, newValue) => {
                      onChangeRatingValueHandler(newValue);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Menu>
  );
};

export default RatingToolTip;
