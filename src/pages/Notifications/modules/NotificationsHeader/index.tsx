import { IconBellFilled } from "@tabler/icons-react";

const NotificationsHeader = () => {
  return (
    <div className="bg-muted min-h-[68px] p-4 flex items-center">
      <IconBellFilled className="h-5 w-5 mr-2" />
      <h2 className="text-lg font-semibold">Список уведомлений</h2>
    </div>
  );
};

export default NotificationsHeader;