import React, { useState } from 'react';
import { Notification } from '@/shared/types/notifications';
import { NotificationContext } from './useNotification';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    
    setTimeout(() => {
      setSelectedNotification(null);
    }, 300); 
  };

  
  return (
    <NotificationContext.Provider value={{ 
      selectedNotification, 
      isModalOpen, 
      openModal, 
      closeModal,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};