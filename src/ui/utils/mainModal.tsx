import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { handlesMainModalIsOpen } from "../../store/reducers/mainModalReducer";
import { Modal } from "@mui/material";
import RatingModalBody from "../components/rating/ratingModalBody";

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

const MainModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.mainModalReducer.isModalOpen
  );

  const handlesModalIsClose = () => {
    dispatch(handlesMainModalIsOpen(false));
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handlesModalIsClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <RatingModalBody />
      </Modal>
    </div>
  );
};

export default MainModal;
