import React from "react";
import { Box, Typography } from "@mui/material";
import { handlesMainModalIsOpen } from "../../../store/reducers/mainModalReducer";
import { useAppDispatch } from "../../../store/storeHooks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RatingModalBody = React.forwardRef(() => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(handlesMainModalIsOpen(false));
  };

  return (
    <Box sx={style}>
      <Typography
        onClick={closeModal}
        id='modal-modal-title'
        variant='h6'
        component='h2'>
        cancel
      </Typography>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Submit Rating
      </Typography>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  );
});

export default RatingModalBody;
