import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reply: string;
  onReplyChange: (text: string) => void;
  onReplySubmit: () => void;
  isPending?: boolean;
}

const ReplyDialog = ({
  open,
  onOpenChange,
  reply,
  onReplyChange,
  onReplySubmit,
  isPending = false,
}: ReplyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ответить на обращение</DialogTitle>
          <DialogDescription>
            Напишите ответ на обращение пользователя. После отправки ответа статус обращения изменится на "Ответ дан".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Введите ваш ответ..."
            className="min-h-[120px]"
            value={reply}
            onChange={(e) => onReplyChange(e.target.value)}
            disabled={isPending}
          />
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button 
            onClick={onReplySubmit}
            disabled={!reply.trim() || isPending}
          >
            {isPending ? "Отправка..." : "Отправить ответ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;