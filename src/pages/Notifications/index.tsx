import NotificationsCard from "./modules/NotificationsCard";
import NotificationModal from "./modules/NotificationModal";
import { NotificationProvider } from "./hooks/NotificationProvider";

const NotificationsPage = () => {
  return (
    <NotificationProvider>
      <div className="mx-auto pt-6">
        <NotificationsCard />
        <NotificationModal />
      </div>
    </NotificationProvider>
  );
};

export default NotificationsPage;