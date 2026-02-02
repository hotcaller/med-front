import FeedbackItem from "./components/FeedbackItem";
import { FeedbackMessage } from "@/shared/types/feedback";

type FeedbackListProps = {
  messages: FeedbackMessage[];
  onDelete: (id: number) => void;
};

const FeedbackList = ({ messages, onDelete }: FeedbackListProps) => {
  if (messages.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Сообщения не найдены</div>;
  }

  return (
    <div className="rounded-md overflow-hidden">
      {messages.map((message) => (
        <FeedbackItem
          key={message.id}
          message={message}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FeedbackList;