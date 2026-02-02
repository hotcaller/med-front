// ReviewList.tsx
import { useState } from "react";
import ReplyDialog from "../../components/ReplyDialog/ReplyDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconMessage, IconArrowsSort, IconNumber, IconCalendar, IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listFeedbackAdmin, answerFeedback } from "@/shared/api/feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils";

const ReviewList = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'status' | 'id' | 'date'>('id');
  const [replyText, setReplyText] = useState("");
  const queryClient = useQueryClient();

  // Fetch feedback data
  const { data: feedbackData, isLoading, isError } = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: listFeedbackAdmin,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { mutate: submitAnswer } = useMutation({
    mutationFn: ({ id, answer }: { id: number, answer: string }) => 
      answerFeedback(id, { answer }),
    onSuccess: () => {
      toast.success("Ответ отправлен успешно");
      setSelectedId(null);
      setReplyText("");
      // Invalidate the feedback query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["admin-feedback"] });
    },
    onError: (error) => {
      toast.error("Ошибка при отправке ответа", {
        description: error.message || "Пожалуйста, попробуйте снова"
      });
    }
  });

  const handleReplySubmit = () => {
    if (selectedId !== null && replyText.trim()) {
      submitAnswer({ id: selectedId, answer: replyText.trim() });
    } else {
      toast.error("Введите текст ответа");
    }
  };

  const reviews = feedbackData || [];
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'status') {
      return (a.answer ? 1 : 0) - (b.answer ? 1 : 0);
    } else if (sortBy === 'id') {
      return a.id - b.id;
    } else {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleReviewClick = (id: number) => {
    const review = reviews.find((r) => r.id === id);
    if (!review?.answer) {
      setSelectedId(id);
      setReplyText("");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <Skeleton className="h-8 w-40" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-6 text-center">
        <IconAlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки данных</h3>
        <p className="text-gray-500 mb-4">Не удалось загрузить список обратной связи</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-feedback"] })}>
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <IconMessage className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Обратная связь</h2>
          <span className="text-sm text-gray-500">({reviews.length})</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={sortBy === 'status' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('status')}
            className="gap-2"
          >
            <IconArrowsSort className="w-4 h-4" />
            По статусу
          </Button>
          <Button 
            variant={sortBy === 'id' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('id')}
            className="gap-2"
          >
            <IconNumber className="w-4 h-4" />
            По ID
          </Button>
          <Button 
            variant={sortBy === 'date' ? 'secondary' : 'outline'} 
            size="sm"
            onClick={() => setSortBy('date')}
            className="gap-2"
          >
            <IconCalendar className="w-4 h-4" />
            По дате
          </Button>
        </div>
      </div>

      {sortedReviews.length === 0 ? (
        <div className="p-12 text-center">
          <IconMessage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Нет обратной связи</h3>
          <p className="text-gray-500">Пока нет сообщений обратной связи от пользователей</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {sortedReviews.map((review) => (
            <div
              key={review.id}
              className={`md:grid md:grid-cols-[160px_1fr_140px] flex flex-col gap-3 px-6 py-4 hover:bg-gray-50/50 transition-colors ${!review.answer ? "cursor-pointer" : ""} group`}
              onClick={() => !review.answer && handleReviewClick(review.id)}
            >
              <div>
                <Badge 
                  variant="outline" 
                  className={`gap-2 ${
                    review.answer 
                    ? "bg-green-50/80 text-green-700 border-green-100 hover:bg-green-100/50" 
                    : "bg-amber-50/80 text-amber-700 border-amber-100 hover:bg-amber-100/50"
                  }`}
                >
                  {review.answer ? (
                    <IconCheck className="w-4 h-4" />
                  ) : (
                    <IconAlertCircle className="w-4 h-4" />
                  )}
                  <span>{review.answer ? "Ответ дан" : "Ожидает ответа"}</span>
                </Badge>
              </div>

              <div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-words pr-4 font-medium">
                  {review.header}
                </p>
                {review.content && (
                  <p className="text-gray-600 text-sm mt-1">{review.content.length > 200 
                    ? `${review.content.substring(0, 200)}...` 
                    : review.content}
                  </p>
                )}
                {review.answer && (
                  <div className="mt-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <p className="text-xs text-gray-500">Ответ: {review.answer}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ReplyDialog 
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        reply={replyText}
        onReplyChange={setReplyText}
        onReplySubmit={handleReplySubmit}
      />
    </div>
  );
};

export default ReviewList;