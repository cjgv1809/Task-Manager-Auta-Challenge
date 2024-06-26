import React from "react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" disableRipple disableElevation>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus
          variant="outlined"
          color="error"
          disableRipple
          disableElevation
        >
          Eliminar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
