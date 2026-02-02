import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFeedback } from "../../hooks/useFeedback";
import { formatDate } from "@/shared/utils";

const FeedbackModal = () => {
  const { selectedMessage, isModalOpen, closeModal } = useFeedback();

  if (!selectedMessage) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex items-center justify-between relative border-b pb-3">
          <DialogTitle className="text-xl font-semibold">
            {selectedMessage.header}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-1">
          {formatDate(selectedMessage.created_at)}
        </div>
        
        <div className="mt-4 space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Ваше сообщение:</h3>
            <p className="text-sm">
              {selectedMessage.content} {/* Отображаем content */}
            </p>
          </div>
          
          {selectedMessage.answer && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Ответ:</h3>
              <p className="text-sm">
                {selectedMessage.answer}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
