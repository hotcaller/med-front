import { createContext, useContext } from "react";
import { Notification } from "@/shared/types/notifications";

type NotificationContextType = {
  selectedNotification: Notification | null;
  isModalOpen: boolean;
  openModal: (notification: Notification) => void;
  closeModal: () => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
