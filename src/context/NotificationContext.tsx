import React, { createContext, useState, ReactNode } from "react";
import type {
  NotificationContextType,
  NotificationState,
  Severity,
} from "@/types";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleNotification = (message: string, severity: Severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider
      value={{ notification, handleNotification, handleCloseNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
