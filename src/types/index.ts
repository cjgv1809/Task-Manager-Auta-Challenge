export type Severity = "error" | "warning" | "info" | "success";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface NotificationState {
  open: boolean;
  message: string;
  severity: Severity;
}

export interface NotificationContextType {
  notification: NotificationState;
  handleNotification: (message: string, severity: Severity) => void;
  handleCloseNotification: () => void;
}

export interface UseTaskItemResultType {
  editing: boolean;
  editTitle: string;
  editDescription: string;
  deleteConfirmOpen: boolean;
  handleComplete: () => Promise<void>;
  handleEdit: () => void;
  handleDeleteClick: () => void;
  handleDeleteConfirm: () => Promise<void>;
  handleDeleteCancel: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  setEditTitle: (title: string) => void;
  setEditDescription: (description: string) => void;
}
