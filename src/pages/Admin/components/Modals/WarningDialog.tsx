import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const warningOptions = [
    "Отмена записи",
    "Перенос записи"
];

interface WarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWarning: string;
  setSelectedWarning: (value: string) => void;
  customTitle: string;
  setCustomTitle: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  onSubmit: () => void;
}

export const WarningDialog = ({
  open,
  onOpenChange,
  selectedWarning,
  setSelectedWarning,
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
        <div className="flex gap-2">
          {warningOptions.map((option) => (
            <Button
              key={option}
              variant={selectedWarning === option ? "default" : "outline"}
              onClick={() => setSelectedWarning(option)}
            >
              {option}
            </Button>
          ))}
        </div>
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
