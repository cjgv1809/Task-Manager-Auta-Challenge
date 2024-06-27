import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { Add as AddIcon } from "@mui/icons-material";
import db from "@/firebase";
import { useNotification } from "@/hooks/useNotification";
import type { TaskFormData } from "@/types";

const TaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();
  const { handleNotification } = useNotification();

  const onSubmit = async (data: TaskFormData) => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...data,
        completed: false,
        createdAt: new Date(),
      });
      reset();
      handleNotification("Tarea agregada exitosamente", "success");
    } catch (error) {
      console.error("Error adding document: ", error);
      handleNotification("Error al agregar la tarea", "error");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      sx={{ mb: 4 }}
    >
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
        helperText={
          errors.description?.message || "Presiona Shift+Enter para nueva línea"
        }
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
