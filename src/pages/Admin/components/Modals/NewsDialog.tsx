import { BaseDialog } from "./BaseDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  onSubmit: () => void;
}

export const NewsDialog = ({
  open,
  onOpenChange,
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
}: NewsDialogProps) => (
  <BaseDialog
    open={open}
    onOpenChange={onOpenChange}
    title="Создать новость"
    submitText="Опубликовать"
    onSubmit={onSubmit}
  >
    <Input
      placeholder="Заголовок новости"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <Textarea
      placeholder="Содержание новости"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </BaseDialog>
);

