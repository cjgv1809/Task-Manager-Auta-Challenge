import React from "react";
import Header from "@/components/Header";
import TaskManager from "./components/TaskManager";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TaskManager />
    </>
  );
};

export default App;
