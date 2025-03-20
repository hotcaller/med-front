import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNotification } from "../../hooks/useNotification";
import { formatDate } from "@/shared/utils";

const NotificationModal = () => {
  const { selectedNotification, isModalOpen, closeModal  } = useNotification();
  
  if (!selectedNotification) return null;
  
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-between relative">
          <DialogTitle className="w-full text-center">
            {selectedNotification.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-2">
          {formatDate(selectedNotification.date)}
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {selectedNotification.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;