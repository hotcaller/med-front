import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils";
import { FeedbackMessage } from "@/shared/types/feedback";
import { cn } from "@/shared/lib/utils";
import { useFeedback } from "@/pages/Feedback/hooks/useFeedback";

type FeedbackItemProps = {
  message: FeedbackMessage;
  onDelete: (id: number ) => void;
};

const FeedbackItem = ({ message, onDelete }: FeedbackItemProps) => {
  const { id, header, answer, created_at } = message;
  const { openModal } = useFeedback();

  const handleClick = () => {
    openModal(message);
  };

  const badgeClasses = !answer
    ? "bg-amber-100 text-amber-800 hover:bg-amber-100" 
    : "bg-green-100 text-green-800 hover:bg-green-100";

  return (
    <div 
      className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-nowrap">
        <div className="font-medium text-sm sm:text-base truncate flex-1 min-w-[50%]">
          {title}
        </div>

        <Badge 
          variant="outline"
          className={cn(
            badgeClasses,
            "hidden sm:flex order-3 w-fit transition-opacity",
            "group-hover:opacity-80 shrink-0"
          )}
        >
          {!answer? "Обрабатывается" : "Ответ получен"}
        </Badge>

        <div className="text-xs text-muted-foreground sm:text-sm whitespace-nowrap sm:order-4">
          {formatDate(created_at)}
        </div>

        <Badge
          variant="outline"
          className={cn(
            badgeClasses,
            "sm:hidden w-fit order-2 transition-opacity",
            "group-hover:opacity-80"
          )}
        >
          {!answer? "Обрабатывается" : "Ответ получен"}
        </Badge>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 h-8 w-8 rounded-full ml-auto sm:ml-0",
            "bg-delete/20 hover:bg-delete/30",
            "transition-all opacity-80 group-hover:opacity-100",
            "order-1 sm:order-5"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          aria-label="Удалить отзыв"
        >
          <IconTrash className="size-4 sm:size-5" />
        </Button>
      </div>
    </div>
  );
};

export default FeedbackItem;