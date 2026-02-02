import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFeedback, SendFeedbackRequest } from "@/shared/api/feedback";
import { toast } from "sonner";
import { useUserStore } from "@/shared/store/useUserStore";

const FeedbackAddModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const userId = useUserStore(state => state.userId);
  
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SendFeedbackRequest) => sendFeedback(data),
    onSuccess: (response) => {
      toast.success("Сообщение отправлено", {
        description: "Ваше сообщение успешно отправлено"
      });
      
      setTitle("");
      setContent("");
      
      onClose();
      
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error: Error) => {
      toast.error("Ошибка при отправке сообщения", {
        description: error.message || "Пожалуйста, попробуйте снова позже"
      });
    }
  });

  const handleSendMessage = () => {
    if (!title.trim()) {
      toast.error("Введите заголовок");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Введите описание");
      return;
    }

    if (!userId) {
      toast.error("Для отправки сообщения необходимо авторизоваться");
      return;
    }

    mutate({
      header: title.trim(),
      content: content.trim(),
      user_id: userId
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить сообщение</DialogTitle>
        </DialogHeader>
        <Textarea 
          placeholder="Введите заголовок..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
          disabled={isPending}
        />
        <Textarea 
          placeholder="Введите описание..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        <DialogFooter className="flex gap-2">
          <Button 
            onClick={handleSendMessage} 
            disabled={isPending}
          >
            {isPending ? "Отправка..." : "Отправить"}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isPending}
          >
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackAddModal;