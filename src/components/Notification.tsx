import React from "react";
import { Snackbar, Alert } from "@mui/material";
import type { Severity } from "@/types";

interface Props {
  open: boolean;
  message: string;
  severity: Severity;
  onClose: () => void;
}

const Notification: React.FC<Props> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
