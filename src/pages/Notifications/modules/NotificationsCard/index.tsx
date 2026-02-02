import { useState } from "react";
import { Card } from "@/components/ui/card";
import NotificationsHeader from "../NotificationsHeader";
import FilterBar from "../FilterBar";
import NotificationsList from "../NotificationsList";
import { FilterOptions, Notification, NotificationType, SortType } from "@/shared/types/notifications";
import TabBar from "../TabBar";
import { useNotificationsStore } from "@/shared/store/useNotificationsStore";
import { useQuery } from "@tanstack/react-query";
import { getNotifications, NotificationsResponse } from "@/shared/api/notifications";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationsCard = () => {
  const [activeTab, setActiveTab] = useState<FilterOptions>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortType>("newest");
  const [typeOption, setTypeOption] = useState<NotificationType | "all">("all");
  
  const { isChecked, isStarred, isDeleted, deleteNotification } = useNotificationsStore();

  const { data, isLoading, isError, error } = useQuery<NotificationsResponse, Error>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 5000, 
    retry: 1,
  });

  // Show loading state for initial load
  if (isLoading && !data) {
    return (
      <Card className="overflow-hidden">
        <NotificationsHeader />
        <div className="p-6 bg-primary-foreground">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // If there's an error and no data, show a message
  if (isError && !data) {
    return (
      <Card className="overflow-hidden">
        <NotificationsHeader />
        <div className="p-6 bg-primary-foreground text-center">
          <p className="text-red-500 mb-2">Failed to load notifications</p>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Unknown error occurred"}
          </p>
        </div>
      </Card>
    );
  }

  // If no notifications data, show empty state
  if (!data || !data.notifications || data.notifications.length === 0) {
    return (
      <Card className="overflow-hidden">
        <NotificationsHeader />
        <div className="p-6 bg-primary-foreground text-center py-12">
          <p className="text-lg font-medium">Уведомления не найдены</p>
          <p className="text-sm text-muted-foreground mt-2">У вас нет уведомлений</p>
        </div>
      </Card>
    );
  }

  const notifications = data.notifications;

  const availableNotifications = notifications.filter(
    (notification: Notification) => !isDeleted(notification.id.toString())
  );

  let filteredNotifications = availableNotifications.filter((notification: Notification) => {
    switch(activeTab) {
      case "all":
        return true;
      case "new":
        return !isChecked(notification.id.toString());
      case "old":
        return isChecked(notification.id.toString());
      case "favourite":
        return isStarred(notification.id.toString());
      default:
        return true;
    }
  }).filter((notification: Notification) => 
    notification.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredNotifications = filteredNotifications.filter((notification: Notification) => {
    if (typeOption === "all") {
      return true;
    }
    return notification.type === typeOption;
  });

  filteredNotifications = [...filteredNotifications].sort((a: Notification, b: Notification) => {
    const dateA = a.created_at;
    const dateB = b.created_at;
    
    switch(sortOption) {
      case "newest":
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      
      case "oldest":
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      
      case "a-z":
        return a.header.localeCompare(b.header);
      
      case "z-a":
        return b.header.localeCompare(a.header);
      
      default:
        return 0;
    }
  });
  
  const counts = {
    all: availableNotifications.length,
    new: availableNotifications.filter((n: Notification) => !isChecked(n.id.toString())).length,
    old: availableNotifications.filter((n: Notification) => isChecked(n.id.toString())).length,
    favourite: availableNotifications.filter((n: Notification) => isStarred(n.id.toString())).length
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
          typeOption={typeOption}
          setTypeOption={setTypeOption}
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
        {/* Show a subtle loading indicator when refreshing in the background */}
        {isLoading && data && (
          <div className="mt-3 text-center text-xs text-muted-foreground">
            Refreshing notifications...
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotificationsCard;