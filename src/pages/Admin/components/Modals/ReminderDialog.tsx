import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { IconChevronDown } from "@tabler/icons-react";

const reminderOptions = [
    "Напоминание о записи на прием",
    "Напоминание о возможности пройти диспансеризацию",
    "Напоминание о сроке прохождения диспансерного наблюдения",
    "Другой вариант",
];

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReminder: string;
  setSelectedReminder: (value: string) => void;
  customReminder: string;
  setCustomReminder: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  onSubmit: () => void;
}

export const ReminderDialog = ({
  open,
  onOpenChange,
  selectedReminder,
  setSelectedReminder,
  customReminder,
  setCustomReminder,
  message,
  setMessage,
  onSubmit,
}: ReminderDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Отправить напоминание</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedReminder || "Выберите тип напоминания"}
              <IconChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {reminderOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => setSelectedReminder(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedReminder === "Другой вариант" && (
          <Input
            placeholder="Введите свой вариант"
            value={customReminder}
            onChange={(e) => setCustomReminder(e.target.value)}
          />
        )}

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