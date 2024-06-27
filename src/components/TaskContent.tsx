import React, { CSSProperties } from "react";
import {
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { Task } from "@/types";
import { truncateText } from "@/utils";
import { UseTaskItemReturn } from "@/hooks/useTaskItem";

interface Props {
  task: Task;
  handleComplete: UseTaskItemReturn["handleComplete"];
}

const getTextStyle = (completed: boolean): CSSProperties => ({
  textDecoration: completed ? "line-through" : "none",
});

const TaskContent: React.FC<Props> = ({ task, handleComplete }) => (
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

export default TaskContent;
