import React from "react";
import { Stack, Button, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { UseTaskItemReturn } from "@/hooks/useTaskItem";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

interface Props
  extends Pick<
    UseTaskItemReturn,
    | "editing"
    | "handleSave"
    | "handleCancel"
    | "handleEdit"
    | "handleDeleteClick"
  > {}

const ActionButtons: React.FC<Props> = ({
  editing,
  handleSave,
  handleCancel,
  handleEdit,
  handleDeleteClick,
}) => {
  const isMobile = useResponsiveLayout();

  return (
    <Stack
      spacing={1}
      direction={isMobile ? "column" : "row"}
      width={isMobile ? "100%" : "auto"}
    >
      {editing ? (
        isMobile ? (
          <>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<SaveIcon />}
              disableTouchRipple
              disableFocusRipple
            >
              Guardar
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              startIcon={<CancelIcon />}
              disableTouchRipple
              disableFocusRipple
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <IconButton
              edge="end"
              aria-label="save"
              title="Guardar tarea"
              onClick={handleSave}
              size="large"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="cancel"
              title="Cancelar edición"
              onClick={handleCancel}
              size="large"
            >
              <CancelIcon />
            </IconButton>
          </>
        )
      ) : isMobile ? (
        <>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            startIcon={<EditIcon />}
            disableTouchRipple
            disableFocusRipple
          >
            Editar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon />}
            disableTouchRipple
            disableFocusRipple
          >
            Eliminar
          </Button>
        </>
      ) : (
        <>
          <IconButton
            edge="end"
            aria-label="edit"
            title="Editar tarea"
            onClick={handleEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            title="Eliminar tarea"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default ActionButtons;
