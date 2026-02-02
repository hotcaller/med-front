import { useState } from "react";
import { Card } from "@/components/ui/card";
import FeedbackHeader from "../FeedbackHeader";
import FilterBar from "../FilterBar";
import FeedbackList from "../FeedbackList";
import { SortType } from "@/shared/types/notifications";
import { useFeedbackStore } from "@/shared/store/useFeedbackStore";
import { useQuery } from "@tanstack/react-query";
import { listFeedback } from "@/shared/api/feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackMessage } from "@/shared/types/feedback";

const FeedbackCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortType>("newest");

  const { messages: storedMessages, isDeleted, deleteMessage } = useFeedbackStore();

  const { data, isLoading, isError, error } = useQuery<FeedbackMessage[], Error>({
    queryKey: ["feedback"],
    queryFn: listFeedback,
    refetchInterval: 5000, 
    retry: 1,
  });

  if (isLoading && !data) {
    return (
      <Card className="overflow-hidden">
        <FeedbackHeader />
        <div className="p-6 bg-primary-foreground">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (isError && !data) {
    return (
      <Card className="overflow-hidden">
        <FeedbackHeader />
        <div className="p-6 bg-primary-foreground text-center">
          <p className="text-red-500 mb-2">Не удалось загрузить сообщения</p>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Произошла неизвестная ошибка"}
          </p>
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="overflow-hidden">
        <FeedbackHeader />
        <div className="p-6 bg-primary-foreground text-center py-12">
          <p className="text-lg font-medium">Сообщений не найдено</p>
          <p className="text-sm text-muted-foreground mt-2">У вас нет сообщений обратной связи</p>
        </div>
      </Card>
    );
  }

  let filteredMessages = data.filter(message => 
    message.header.toLowerCase().includes(searchTerm.toLowerCase()) && !isDeleted(message.id)
  );

  filteredMessages = [...filteredMessages].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "a-z":
        return a.header.localeCompare(b.header);
      case "z-a":
        return b.header.localeCompare(a.header);
      default:
        return 0;
    }
  });

  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
  };

  return (
    <Card className="overflow-hidden">
      <FeedbackHeader />
      <div className="p-6 bg-primary-foreground">
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <FeedbackList 
          messages={filteredMessages}
          onDelete={handleDeleteMessage}
        />
        {isLoading && data && (
          <div className="mt-3 text-center text-xs text-muted-foreground">
            Обновление сообщений...
          </div>
        )}
      </div>
    </Card>
  );
};

export default FeedbackCard;