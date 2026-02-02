import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface WarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customTitle: string;
  setCustomTitle: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  onSubmit: () => void;
}

export const WarningDialog = ({
  open,
  onOpenChange,
  customTitle,
  setCustomTitle,
  message,
  setMessage,
  onSubmit,
}: WarningDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Отправить предупреждение"}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">

        <Input 
          placeholder="Введите свой заголовок" 
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)} 
        />
        <Textarea
          placeholder="Информирующий текст"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>Отправить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
