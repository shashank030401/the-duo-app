import { Dialog } from "@mui/material";
import React from "react";

function CustomDialog({ isOpen, handleClose, dialogContentComponent }) {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      {dialogContentComponent}
    </Dialog>
  );
}

export default CustomDialog;
