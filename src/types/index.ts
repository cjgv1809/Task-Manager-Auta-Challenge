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
