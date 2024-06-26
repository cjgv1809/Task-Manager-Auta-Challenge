import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { List, Typography } from "@mui/material";
import TaskItem from "./TaskItem";
import db from "../firebase";
import type { Severity, Task } from "../types";

interface Props {
  onNotification: (message: string, severity: Severity) => void;
  searchTerm: string;
}

const TaskList: React.FC<Props> = ({ onNotification, searchTerm }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksData: Task[] = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() } as Task);
        });
        setTasks(tasksData);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        onNotification("Error al cargar las tareas", "error");
      }
    );

    return () => unsubscribe();
  }, [onNotification]);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowercasedTerm) ||
          task.description.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, searchTerm]);

  return (
    <>
      {filteredTasks.length > 0 ? (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onNotification={onNotification}
            />
          ))}
        </List>
      ) : (
        <Typography variant="body1" align="center">
          No se encontraron tareas que coincidan con la búsqueda
        </Typography>
      )}
    </>
  );
};

export default TaskList;
