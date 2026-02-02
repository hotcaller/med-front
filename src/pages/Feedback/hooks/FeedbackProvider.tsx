import { FeedbackMessage } from "@/shared/types/feedback";
import { ReactNode, useState } from "react";
import { FeedbackContext } from "./useFeedback";

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMessage, setSelectedMessage] = useState<FeedbackMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = (message: FeedbackMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    
    setTimeout(() => {
      setSelectedMessage(null);
    }, 300); 
  };
  
  return (
    <FeedbackContext.Provider value={{ 
      selectedMessage, 
      isModalOpen, 
      openModal, 
      closeModal,
    }}>
      {children}
    </FeedbackContext.Provider>
  );
};