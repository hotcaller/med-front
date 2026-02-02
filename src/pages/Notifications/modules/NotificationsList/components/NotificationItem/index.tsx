import {
  IconStar,
  IconStarFilled,
  IconTrash,
  IconNews,
  IconBell,
  IconAlertCircle,
  IconUserExclamation,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/shared/utils";
import { Notification } from "@/shared/types/notifications";
import { useNotification } from "@/pages/Notifications/hooks/useNotification";
import { useNotificationsStore } from "@/shared/store/useNotificationsStore";

type NotificationItemProps = {
  notification: Notification;
  onDelete: (id: string) => void;
};

const NotificationItem = ({ notification, onDelete }: NotificationItemProps) => {
  const { id, header, type } = notification;
  const dateToFormat = notification.created_at;
  const { openModal } = useNotification();
  
  const { isStarred, toggleStar, markAsChecked, isChecked } = useNotificationsStore();
  
  const starred = isStarred(id);
  const checked = isChecked(id);

  const handleClick = () => {
    markAsChecked(id);
    openModal(notification);
  };

  const typeConfig = {
    news: {
      icon: <IconNews className="size-5" />, textColor: "text-blue-700 bg-blue-100"
    },
    reminder: {
      icon: <IconBell className="size-5" />, textColor: "text-purple-700 bg-purple-100"
    },
    warning: {
      icon: <IconAlertCircle className="size-5" />, textColor: "text-amber-700 bg-amber-100"
    },
    important: {
      icon: <IconUserExclamation className="size-5" />, textColor: "text-red-700 bg-red-100"
    }
  };

  const { icon, textColor } = typeConfig[type] || typeConfig.news; // Fallback to news if type not found

  return (
    <div 
      className={`flex items-center gap-4 p-4 shadow-md transition-all cursor-pointer
        ${!checked ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-50"} w-full md:w-auto`}
      onClick={handleClick}
    >
      <div 
        className={`hidden sm:block size-3 rounded-full ${!checked ? "bg-blue-500" : "bg-gray-400"}`}
      />
      
      <Button
        variant="ghost"
        size="sm"
        className="p-0 size-4 sm:size-8 text-gray-500 hover:text-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          toggleStar(id);
        }}
      >
        {starred ? <IconStarFilled className="size-5 text-yellow-500" /> : <IconStar className="size-5" />}
      </Button>

      <div className={`flex items-center justify-center rounded-full p-2 size-7 sm:size-10 ${textColor}`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate w-full">{header}</div>
        <div className="text-xs text-gray-500">{formatDate(dateToFormat)}</div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-8 w-8 text-gray-500 hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <IconTrash className="size-5" />
      </Button>
    </div>
  );
};

export default NotificationItem;