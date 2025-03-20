import { BaseDialog } from "./BaseDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ImportantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  onSubmit: () => void;
}

export const ImportantDialog = ({
  open,
  onOpenChange,
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
}: ImportantDialogProps) => (
  <BaseDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Создать важное уведомление"
    submitText="Отправить"
    onSubmit={onSubmit}
  >
    <Input
      placeholder="Заголовок уведомления"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <Textarea
      placeholder="Содержание уведомления"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </BaseDialog>
);