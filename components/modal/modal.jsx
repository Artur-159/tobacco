import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "../button/button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { setModalOpen } from "../../store/modal/slice";

import styles from "./styles.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
};

const BasicModal = ({
  children,
  title = "",
  color,
  variant,
  startIcon,
  modalId,
  className,
}) => {
  const dispatch = useDispatch();

  const [fade, setFade] = useState(false);
  const isOpen = useSelector((state) =>
    modalId ? state.modal.modals[modalId] ?? false : state.modal.singleModal
  );

  const handleOpen = () => {
    setFade(true);
    setTimeout(() => {
      dispatch(setModalOpen({ modalId, isOpen: true }));
    }, 300);
  };

  const handleClose = () => {
    setFade(false);
    setTimeout(() => {
      dispatch(setModalOpen({ modalId, isOpen: false }));
    }, 300);
  };

  useEffect(() => {
    setFade(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Button
        color={color}
        variant={variant}
        onClick={handleOpen}
        startIcon={startIcon}
        className={clsx(styles.modal_button)}
      >
        {title}
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box
          sx={style}
          className={clsx(
            className,
            styles.modalContent,
            fade ? styles.fadeIn : styles.fadeOut
          )}
        >
          <div className={styles.modal_children}>{children}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
