import { createContext, useContext } from 'react';
import { FeedbackMessage } from '@/shared/types/feedback';

type FeedbackContextType = {
  selectedMessage: FeedbackMessage | null;
  isModalOpen: boolean;
  openModal: (message: FeedbackMessage) => void;
  closeModal: () => void;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);


export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
