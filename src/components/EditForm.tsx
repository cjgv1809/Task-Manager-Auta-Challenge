import React from "react";
import { TextField, Box } from "@mui/material";
import { UseTaskItemReturn } from "@/hooks/useTaskItem";

interface Props
  extends Pick<
    UseTaskItemReturn,
    "editTitle" | "editDescription" | "setEditTitle" | "setEditDescription"
  > {}

const EditForm: React.FC<Props> = ({
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
}) => (
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
  </Box>
);

export default EditForm;
