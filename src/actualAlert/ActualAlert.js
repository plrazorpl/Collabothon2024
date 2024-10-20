import React, { useEffect } from "react";
import { Snackbar } from "@mui/material";
import { closeSnack, nextSnack, resetMessageInfo } from "./actualAlertSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

export function ActualAlert() {
  const dispatch = useDispatch();
  const snackPack = useSelector((state) => state.actualAlert.snackPack);
  const open = useSelector((state) => state.actualAlert.open);
  const messageInfo = useSelector((state) => state.actualAlert.messageInfo);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      dispatch(nextSnack());
    } else if (snackPack.length && messageInfo && open) {
      dispatch(closeSnack());
    }
  }, [snackPack, messageInfo, open, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnack());
  };

  const handleExited = () => {
    dispatch(resetMessageInfo());
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        onClose={handleClose}
        severity={messageInfo ? messageInfo.severity : "info"}
      >
        {messageInfo ? messageInfo.message : undefined}
      </Alert>
    </Snackbar>
  );
}
