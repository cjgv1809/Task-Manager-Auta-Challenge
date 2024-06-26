import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { Add as AddIcon } from "@mui/icons-material";
import db from "../firebase";
import type { Severity, TaskFormData } from "../types";

interface Props {
  onNotification: (message: string, severity: Severity) => void;
}

const TaskForm: React.FC<Props> = ({ onNotification }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = async (data: TaskFormData) => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...data,
        completed: false,
        createdAt: new Date(),
      });
      reset();
      onNotification("Tarea agregada exitosamente", "success");
    } catch (error) {
      console.error("Error adding document: ", error);
      onNotification("Error al agregar la tarea", "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <TextField
        {...register("title", {
          required: "El título es requerido",
          minLength: {
            value: 3,
            message: "El título debe tener al menos 3 caracteres",
          },
          validate: (value) =>
            value.trim() !== "" || "El título no puede contener solo espacios",
        })}
        label="Título"
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title?.message}
        autoFocus
      />
      <TextField
        {...register("description", {
          required: "La descripción es requerida",
          minLength: {
            value: 10,
            message: "La descripción debe tener al menos 10 caracteres",
          },
          validate: (value) =>
            value.trim() !== "" ||
            "La descripción no puede contener solo espacios",
        })}
        label="Descripción"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          startIcon={<AddIcon />}
          aria-label="Agregar tarea"
          disableRipple
        >
          Agregar tarea
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
