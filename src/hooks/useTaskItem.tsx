import { useState, useCallback } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "@/firebase";
import type { Severity, Task, UseTaskItemResultType } from "@/types";

export const useTaskItem = (
  task: Task,
  onNotification: (message: string, severity: Severity) => void
): UseTaskItemResultType => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

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

  const handleEdit = useCallback(() => {
    if (!task.completed) {
      setEditing(true);
    } else {
      onNotification("No puedes editar una tarea completada", "warning");
    }
  }, [task.completed, onNotification]);

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
      if (!editTitle || editTitle.trim() === "") {
        onNotification("El título de la tarea no puede estar vacío", "warning");
        return;
      }
      if (!editDescription || editDescription.trim() === "") {
        onNotification(
          "La descripción de la tarea no puede estar vacía",
          "warning"
        );
        return;
      }
      if (
        editTitle.trim() === task.title.trim() &&
        editDescription.trim() === task.description.trim()
      ) {
        onNotification("No se realizaron cambios en la tarea", "warning");
        setEditing(false);
        return;
      }

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
  }, [
    task.id,
    task.title,
    task.description,
    editTitle,
    editDescription,
    onNotification,
  ]);

  const handleCancel = useCallback(() => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditing(false);
  }, [task.title, task.description]);

  return {
    editing,
    editTitle,
    editDescription,
    deleteConfirmOpen,
    handleComplete,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleSave,
    handleCancel,
    setEditTitle,
    setEditDescription,
  };
};

export type UseTaskItemReturn = ReturnType<typeof useTaskItem>;
