import { IconFriends } from "@tabler/icons-react";
import { useState } from "react";
import { ReminderDialog } from "./components/Modals/ReminderDialog";
import { WarningDialog } from "./components/Modals/WarningDialog";
import { NewsDialog } from "./components/Modals/NewsDialog";
import { ImportantDialog } from "./components/Modals/ImportantDialog";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { UserList } from "./modules/UserList";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSubscriptions, SubscriptionsResponse } from "@/shared/api/subscriptions";
import { sendNotification, SendNotificationRequest } from "@/shared/api/notifications";
import { NotificationType } from "@/shared/types/notifications";
import { toast } from "sonner";

const AdminNotifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isImportantOpen, setIsImportantOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReminder, setSelectedReminder] = useState("");
  const [customReminder, setCustomReminder] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [importantTitle, setImportantTitle] = useState("");
  const [importantContent, setImportantContent] = useState("");

  // Fetch subscriptions with React Query
  const { data, isLoading, isError } = useQuery<SubscriptionsResponse, Error>({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
    refetchInterval: 5000,
    retry: 1,
  });

  // Create mutation for sending notifications
  const { mutate: sendNotificationMutation } = useMutation({
    mutationFn: (notificationData: SendNotificationRequest) => sendNotification(notificationData),
    onSuccess: () => {
      toast.success("Уведомление отправлено успешно");
    },
    onError: (error) => {
      toast.error("Ошибка при отправке уведомления", {
        description: error.message || "Пожалуйста, попробуйте снова"
      });
    }
  });

  // Generic function to send a notification
  const handleSendNotification = (
    type: NotificationType, 
    header: string, 
    message: string, 
    reset: () => void, 
    close: () => void
  ) => {

    if (!selectedUserId && selectedUserId !== 0) {
      toast.error("Пользователь не выбран");
      return;
    }

    if (!header.trim()) {
      toast.error("Заголовок не может быть пустым");
      return;
    }

    if (!message.trim()) {
      toast.error("Сообщение не может быть пустым");
      return;
    }

    const notificationData: SendNotificationRequest = {
      header: header.trim(),
      message: message.trim(),
      type: type,
      target_id: selectedUserId,
      org_token: "123"
    };

    sendNotificationMutation(notificationData, {
      onSuccess: () => {
        reset();
        close();
        setSelectedUserId(null);
      }
    });
  };

  // Handle reminder notification
  const handleSubmitReminder = () => {
    const reminderHeader = customReminder ? customReminder : selectedReminder;
    handleSendNotification(
      "reminder",
      reminderHeader,
      message,
      () => {
        setSelectedReminder("");
        setCustomReminder("");
        setMessage("");
      },
      () => setIsReminderOpen(false)
    );
  };

  // Handle warning notification
  const handleSubmitWarning = () => {
    const warningHeader = customTitle;
    handleSendNotification(
      "warning",
      warningHeader,
      message,
      () => {
        setCustomTitle("");
        setMessage("");
      },
      () => setIsWarningOpen(false)
    );
  };

  // Handle news notification
  const handleSubmitNews = () => {
    handleSendNotification(
      "news",
      newsTitle,
      newsContent,
      () => {
        setNewsTitle("");
        setNewsContent("");
      },
      () => setIsNewsOpen(false)
    );
  };

  // Handle important notification
  const handleSubmitImportant = () => {
    handleSendNotification(
      "important",
      importantTitle,
      importantContent,
      () => {
        setImportantTitle("");
        setImportantContent("");
      },
      () => setIsImportantOpen(false)
    );
  };

  // Handle opening different notification modals
  const handleOpenNews = (userId: number) => {
    setSelectedUserId(userId);
    setIsNewsOpen(true);
  };

  const handleOpenReminder = (userId: number) => {
    setSelectedUserId(userId);
    setIsReminderOpen(true);
  };

  const handleOpenWarning = (userId: number) => {
    setSelectedUserId(userId);
    setIsWarningOpen(true);
  };

  const handleOpenImportant = (userId: number) => {
    setSelectedUserId(userId);
    setIsImportantOpen(true);
  };

  // Filter subscriptions based on search query
  const subscriptions = data?.subscriptions || [];
  const filteredSubscriptions = subscriptions.filter(
    (subscription) => 
      subscription.patient_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.id.toString().includes(searchQuery)
  );

  return (
    <div className="mx-auto pt-6">
      <Card className="overflow-hidden">
        <PageHeader />
        
        <ReminderDialog
          open={isReminderOpen}
          onOpenChange={setIsReminderOpen}
          selectedReminder={selectedReminder}
          setSelectedReminder={setSelectedReminder}
          customReminder={customReminder}
          setCustomReminder={setCustomReminder}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmitReminder}
        />

        <WarningDialog
          open={isWarningOpen}
          onOpenChange={setIsWarningOpen}
          customTitle={customTitle}
          setCustomTitle={setCustomTitle}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmitWarning}
        />

        <NewsDialog
          open={isNewsOpen}
          onOpenChange={setIsNewsOpen}
          title={newsTitle}
          setTitle={setNewsTitle}
          content={newsContent}
          setContent={setNewsContent}
          onSubmit={handleSubmitNews}
        />

        <ImportantDialog
          open={isImportantOpen}
          onOpenChange={setIsImportantOpen}
          title={importantTitle}
          setTitle={setImportantTitle}
          content={importantContent}
          setContent={setImportantContent}
          onSubmit={handleSubmitImportant}
        />

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-col items-center justify-between gap-4 border-b bg-white p-6 sm:flex-row">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-center font-medium text-blue-800 w-full sm:w-auto">
              {filteredSubscriptions.length} Пользователей
            </span>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <p>Загрузка пользователей...</p>
            </div>
          ) : isError ? (
            <div className="p-12 text-center">
              <p className="text-red-500">Ошибка при загрузке пользователей</p>
            </div>
          ) : (
            <>
              {filteredSubscriptions.length > 0 ? (
                <UserList
                  users={filteredSubscriptions}
                  onOpenNews={handleOpenNews}
                  onOpenReminder={handleOpenReminder}
                  onOpenWarning={handleOpenWarning}
                  onOpenImportant={handleOpenImportant}
                />
              ) : (
                <div className="p-12 text-center">
                  <IconFriends className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-sm font-medium text-gray-900">
                    Пользователи не найдены
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminNotifications;