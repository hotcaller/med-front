import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  submitText: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

export const BaseDialog = ({
  open,
  onOpenChange,
  title,
  submitText,
  onSubmit,
  children,
}: BaseDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">{children}</div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>{submitText}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);