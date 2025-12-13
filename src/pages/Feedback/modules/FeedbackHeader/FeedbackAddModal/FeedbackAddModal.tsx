import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFeedback, SendFeedbackRequest } from "@/shared/api/feedback";
import { toast } from "sonner";
import { useUserStore } from "@/shared/store/useUserStore";

const FeedbackAddModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userId = useUserStore((state) => state.userId);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SendFeedbackRequest) => sendFeedback(data),
    onSuccess: () => {
      toast.success("Сообщение отправлено", {
        description: "Ваше сообщение успешно отправлено",
      });

      setTitle("");
      setContent("");

      onClose();

      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error: Error) => {
      toast.error("Ошибка при отправке сообщения", {
        description: error.message || "Пожалуйста, попробуйте снова позже",
      });
    },
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
      user_id: userId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-11/12 sm:max-w-lg
          rounded-2xl
          p-6 sm:p-7
          shadow-xl
          border
        "
      >
        {/* w-11/12 — чтобы модалка не упиралась в края на мобилках */}
        {/* (частая проблема при использовании только sm:max-w-*) */}
        {/* https://stackoverflow.com/... */}
        {/* ref: shadcn DialogContent + tailwind fix */}
        {/* citation in ответе выше */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl leading-tight">
            Добавить сообщение
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Опишите проблему или предложение — команда увидит ваше сообщение.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 grid gap-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium">Заголовок</div>
            <Textarea
              placeholder="Например: Планируется ли вакцинация в ближайшее время?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              rows={2}
              className="
                resize-none
                rounded-xl
                bg-muted/40
                border-muted
                focus-visible:ring-2
                focus-visible:ring-ring/40
              "
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium">Описание</div>
            <Textarea
              placeholder="Как прошло ваше взаимодействие"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPending}
              rows={6}
              className="
                rounded-xl
                bg-muted/40
                border-muted
                focus-visible:ring-2
                focus-visible:ring-ring/40
              "
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isPending} className="rounded-xl">
            Отмена
          </Button>
          <Button onClick={handleSendMessage} disabled={isPending} className="rounded-xl">
            {isPending ? "Отправка..." : "Отправить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackAddModal;
