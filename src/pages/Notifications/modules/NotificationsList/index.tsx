import NotificationItem from "./components/NotificationItem";
import { Notification } from "@/shared/types/notifications";

type NotificationsListProps = {
  notifications: Notification[];
  onDelete: (id: string) => void;
};

const NotificationsList = ({ notifications, onDelete }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Уведомления не найдены</div>;
  }

  return (
    <div className="rounded-md overflow-hidden">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationsList;