// TaskManager.tsx
import React from "react";
import { Container, Typography, styled } from "@mui/material";
import { useNotification } from "@/hooks/useNotification";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Notification from "./Notification";

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const TaskManager: React.FC = () => {
  const { notification, handleCloseNotification } = useNotification();

  return (
    <Content>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight={700}
          gutterBottom
          marginTop={4}
        >
          Gestor de Tareas
        </Typography>
        <TaskForm />
        <TaskList />
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Container>
    </Content>
  );
};

export default TaskManager;
