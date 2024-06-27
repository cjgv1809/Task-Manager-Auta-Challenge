import React from "react";
import { Typography, Paper } from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import { Search as SearchIcon } from "@mui/icons-material";

interface EmptyTaskListProps {
  isSearching: boolean;
  searchTerm: string;
}

const EmptyTaskList: React.FC<EmptyTaskListProps> = ({
  isSearching,
  searchTerm,
}) => {
  const icon = isSearching ? (
    <SearchIcon sx={{ fontSize: 60, color: "text.secondary" }} />
  ) : (
    <AssignmentIcon sx={{ fontSize: 60, color: "text.secondary" }} />
  );

  const title = isSearching
    ? `No se encontraron tareas para "${searchTerm}"`
    : "No hay tareas pendientes";

  const message = isSearching
    ? "Intenta con otra búsqueda o crea una nueva tarea que coincida con este término."
    : "Has completado todas tus tareas. ¿Quieres añadir una nueva?";

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        backgroundColor: "background.default",
      }}
    >
      {icon}
      <Typography variant="h5" component="h2" align="center">
        {title}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        {message}
      </Typography>
    </Paper>
  );
};

export default EmptyTaskList;
