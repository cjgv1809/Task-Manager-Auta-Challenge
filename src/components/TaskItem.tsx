import React from "react";
import { ListItem, Divider, Box } from "@mui/material";
import type { Task } from "@/types";
import { useTaskItem } from "@/hooks/useTaskItem";
import Dialog from "./Dialog";
import { useNotification } from "@/hooks/useNotification";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import EditForm from "./EditForm";
import TaskContent from "./TaskContent";
import TaskActions from "./TaskActions";

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = React.memo(({ task }) => {
  const isMobile = useResponsiveLayout();
  const { handleNotification } = useNotification();
  const taskItemProps = useTaskItem(task, handleNotification);

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
          {taskItemProps.editing ? (
            <EditForm {...taskItemProps} />
          ) : (
            <TaskContent task={task} {...taskItemProps} />
          )}
          {isMobile && (
            <Box width="100%" mt={2}>
              <TaskActions {...taskItemProps} />
            </Box>
          )}
        </Box>
        {!isMobile && (
          <Box ml={2} display="flex" alignItems="center">
            <TaskActions {...taskItemProps} />
          </Box>
        )}
      </ListItem>
      <Divider variant="fullWidth" aria-hidden="true" />
      <Dialog
        open={taskItemProps.deleteConfirmOpen}
        onClose={taskItemProps.handleDeleteCancel}
        title="Confirmar eliminación"
        content="¿Estás seguro de que quieres eliminar esta tarea?"
        onConfirm={taskItemProps.handleDeleteConfirm}
      />
    </>
  );
});

export default TaskItem;
