import { useState } from "react";
import { Card } from "@/components/ui/card";
import NotificationsHeader from "../NotificationsHeader";
import FilterBar from "../FilterBar";
import NotificationsList from "../NotificationsList";
import { NotificationType, SortType } from "@/shared/types/notifications";
import TabBar from "../TabBar";
import { notifications } from "@/shared/mocks";
import { useNotificationsStore } from "@/shared/store/useNotificationsStore";

const NotificationsCard = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortType>("newest");
  
  const { isChecked, isStarred, isDeleted, deleteNotification } = useNotificationsStore();

  let filteredNotifications = notifications.filter(notification => {
    switch(activeTab) {
      case "all":
        return true;
      case "new":
        return !isChecked(notification.id);
      case "old":
        return isChecked(notification.id);
      case "favourite":
        return isStarred(notification.id);
      default:
        return true;
    }
  }).filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && !isDeleted(notification.id)
  );

  filteredNotifications = [...filteredNotifications].sort((a, b) => {
    switch(sortOption) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      
      case "a-z":
        return a.title.localeCompare(b.title);
      
      case "z-a":
        return b.title.localeCompare(a.title);
      
      default:
        return 0;
    }
  });

  const counts = {
    all: notifications.length,
    new: notifications.filter(n => !isChecked(n.id)).length,
    old: notifications.filter(n => isChecked(n.id)).length,
    favourite: notifications.filter(n => isStarred(n.id)).length
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
  };

  return (
    <Card className="overflow-hidden">
      <NotificationsHeader />
      <div className="p-6 bg-primary-foreground">
        <FilterBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <TabBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          counts={counts} 
        />
        <NotificationsList 
          notifications={filteredNotifications}
          onDelete={handleDeleteNotification}
        />
      </div>
    </Card>
  );
};

export default NotificationsCard;