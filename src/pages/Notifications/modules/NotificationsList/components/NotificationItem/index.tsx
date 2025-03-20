import { IconStar, IconStarFilled, IconTrash } from "@tabler/icons-react";
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
  const { id, title, date } = notification;
  const { openModal } = useNotification();
  
  const { isStarred, toggleStar, markAsChecked, isChecked } = useNotificationsStore();
  
  const starred = isStarred(id);
  
  const checked = isChecked(id);

  const handleClick = () => {
    markAsChecked(id);
    openModal(notification);
  };

  return (
    <div 
      className={`flex items-center p-3 ${
        !checked ? "bg-muted" : "bg-primary-foreground"
      } cursor-pointer`}
      onClick={handleClick}
    >
      <div 
        className={`h-3 w-3 rounded-full mr-3 ${
          !checked ? "bg-new-notification-circle" : "bg-checked-notification-circle"
        }`}
      />
      
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-8 w-8 mr-3 text-star"
        onClick={(e) => {
          e.stopPropagation();
          toggleStar(id);
        }}
      >
        {starred ? (
          <IconStarFilled className="size-5"/>
        ) : (
          <IconStar className="size-5"/>
        )}
      </Button>
      
      <div className="flex-1 grid grid-cols-10 gap-4 items-center">
        <div className="col-span-8 font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-8 w-8 bg-delete rounded-full hover:bg-delete-hover"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <IconTrash className="size-5"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;