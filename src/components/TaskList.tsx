import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { List, Typography } from "@mui/material";
import db from "@/firebase";
import { useSearch } from "@/hooks/useSearch";
import { useNotification } from "@/hooks/useNotification";
import type { Task } from "@/types";
import TaskItem from "./TaskItem";
import Skeleton from "./Skeleton";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();
  const { handleNotification } = useNotification();

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
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        handleNotification("Error al cargar las tareas", "error");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [handleNotification]);

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

  if (loading) return <Skeleton />;

  return (
    <>
      {filteredTasks.length > 0 ? (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      ) : (
        <Typography variant="h5" component="p" align="center">
          No se encontraron tareas.
        </Typography>
      )}
    </>
  );
};

export default TaskList;
