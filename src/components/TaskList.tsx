import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { Collapse, Grow, List } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import db from "@/firebase";
import { useSearch } from "@/hooks/useSearch";
import { useNotification } from "@/hooks/useNotification";
import type { Task } from "@/types";
import TaskItem from "./TaskItem";
import Skeleton from "./Skeleton";
import EmptyTaskList from "./EmptyTaskList";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();
  const { handleNotification } = useNotification();

  const isSearching = searchTerm !== "";

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
          <TransitionGroup>
            {filteredTasks.map((task, index) => (
              <Collapse key={task.id}>
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 1000 + index * 100 }}
                >
                  <div>
                    <TaskItem task={task} />
                  </div>
                </Grow>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      ) : (
        <EmptyTaskList isSearching={isSearching} searchTerm={searchTerm} />
      )}
    </>
  );
};

export default TaskList;
