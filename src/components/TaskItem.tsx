import React, { useState, useCallback, CSSProperties } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  ListItemIcon,
  Divider,
  Stack,
  Tooltip,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import type { Severity, Task } from "../types";
import { truncateText } from "../utils";
import Dialog from "./Dialog";

interface Props {
  task: Task;
  onNotification: (message: string, severity: Severity) => void;
}

const TaskItem: React.FC<Props> = ({ task, onNotification }) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleComplete = useCallback(async () => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      });
      onNotification("Tarea actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error updating document: ", error);
      onNotification("Error al actualizar la tarea", "error");
    }
  }, [task.id, task.completed, onNotification]);

  const handleEdit = useCallback(() => setEditing(true), []);
  const handleDeleteClick = useCallback(() => setDeleteConfirmOpen(true), []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteDoc(doc(db, "tasks", task.id));
      onNotification("Tarea eliminada exitosamente", "success");
    } catch (error) {
      console.error("Error deleting document: ", error);
      onNotification("Error al eliminar la tarea", "error");
    }
    setDeleteConfirmOpen(false);
  }, [task.id, onNotification]);

  const handleDeleteCancel = useCallback(() => setDeleteConfirmOpen(false), []);

  const handleSave = useCallback(async () => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        title: editTitle,
        description: editDescription,
      });
      setEditing(false);
      onNotification("Tarea actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error updating document: ", error);
      onNotification("Error al actualizar la tarea", "error");
    }
  }, [task.id, editTitle, editDescription, onNotification]);

  const handleCancel = useCallback(() => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditing(false);
  }, [task.title, task.description]);

  const getTextStyle = (completed: boolean): CSSProperties => ({
    textDecoration: completed ? "line-through" : "none",
  });

  const renderActions = useCallback(() => {
    if (editing) {
      return (
        <Stack
          spacing={1}
          direction={isMobile ? "column" : "row"}
          width={isMobile ? "100%" : "auto"}
        >
          {isMobile ? (
            <>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
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
          )}
        </Stack>
      );
    }
    return (
      <Stack
        spacing={1}
        direction={isMobile ? "column" : "row"}
        width={isMobile ? "100%" : "auto"}
      >
        {isMobile ? (
          <>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleEdit}
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon />}
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
  }, [
    editing,
    isMobile,
    handleSave,
    handleCancel,
    handleEdit,
    handleDeleteClick,
  ]);

  const renderEditForm = () => (
    <Box width="100%">
      <TextField
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        fullWidth
        margin="normal"
        autoFocus
      />
      <TextField
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        fullWidth
        multiline
        margin="normal"
      />
      {isMobile && (
        <Box width="100%" mt={2}>
          {renderActions()}
        </Box>
      )}
    </Box>
  );

  const renderTaskContent = () => (
    <Box display="flex" alignItems="center" width="100%">
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={handleComplete}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography component="p" style={getTextStyle(task.completed)}>
            {task.title.length > 40 ? (
              <Tooltip title={task.title} arrow placement="top-start">
                <span>{truncateText(task.title, 20)}</span>
              </Tooltip>
            ) : (
              task.title
            )}
          </Typography>
        }
        secondary={
          <Typography
            component="p"
            variant="body2"
            style={getTextStyle(task.completed)}
          >
            {task.description.length > 50 ? (
              <Tooltip title={task.description} arrow placement="top-start">
                <span>{truncateText(task.description, 25)}</span>
              </Tooltip>
            ) : (
              task.description
            )}
          </Typography>
        }
      />
    </Box>
  );

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          py: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          width={isMobile ? "100%" : "auto"}
        >
          {editing ? renderEditForm() : renderTaskContent()}
          {isMobile && !editing && (
            <Box width="100%" mt={2}>
              {renderActions()}
            </Box>
          )}
        </Box>
        {!isMobile && (
          <Box ml={2} display="flex" alignItems="center">
            {renderActions()}
          </Box>
        )}
      </ListItem>
      <Divider variant="fullWidth" aria-hidden="true" />
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        title="Confirmar eliminación"
        content="¿Estás seguro de que quieres eliminar esta tarea?"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default TaskItem;
