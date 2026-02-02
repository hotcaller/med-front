import { Button } from "@/components/ui/button";
import {
  IconAlertCircle,
  IconBell,
  IconNews,
  IconUserExclamation,
  IconUsersPlus,
} from "@tabler/icons-react";
import { Subscription } from "@/shared/api/subscriptions";

interface UserListProps {
  users: Subscription[];
  onOpenNews: (userId: number) => void;
  onOpenReminder: (userId: number) => void;
  onOpenWarning: (userId: number) => void;
  onOpenImportant: (userId: number) => void;
}

export const UserList = ({
  users,
  onOpenNews,
  onOpenReminder,
  onOpenWarning,
  onOpenImportant,
}: UserListProps) => {
  // Sort subscriptions by ID
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);

  return (
    <div className="divide-y">
            <div
        key="send-to-all"
        className="flex flex-col justify-between gap-4 p-6 bg-gray-50 hover:bg-gray-100 sm:flex-row sm:items-center"
      >
        <div className="space-y-1">
          <p className="font-medium text-gray-900 flex items-center">
            <IconUsersPlus className="mr-2 h-5 w-5 text-blue-500" />
            Отправить всем пользователям
          </p>
          <p className="text-sm text-gray-500">Массовая рассылка уведомлений</p>
        </div>
        <NotificationButtons
          userId={0} // Special ID for "all users"
          onOpenNews={onOpenNews}
          onOpenReminder={onOpenReminder}
          onOpenWarning={onOpenWarning}
          onOpenImportant={onOpenImportant}
        />
      </div>
      
      {sortedUsers.map((user) => (
        <div
          key={user.id}
          className="flex flex-col justify-between gap-4 p-6 hover:bg-gray-50 sm:flex-row sm:items-center"
        >
          <div className="space-y-1">
            <p className="font-medium text-gray-900">Пользователь {user.patient_id}</p>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
          <NotificationButtons
            userId={user.id}
            onOpenNews={onOpenNews}
            onOpenReminder={onOpenReminder}
            onOpenWarning={onOpenWarning}
            onOpenImportant={onOpenImportant}
          />
        </div>
      ))}
    </div>
  );
};

interface NotificationButtonsProps {
  userId: number;
  onOpenNews: (userId: number) => void;
  onOpenReminder: (userId: number) => void;
  onOpenWarning: (userId: number) => void;
  onOpenImportant: (userId: number) => void;
}

const NotificationButtons = ({
  userId,
  onOpenNews,
  onOpenReminder,
  onOpenWarning,
  onOpenImportant,
}: NotificationButtonsProps) => (
  <div className="flex flex-wrap gap-2">
    <Button
      variant="outline"
      className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
      onClick={() => onOpenNews(userId)}
    >
      <IconNews className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Новость</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-purple-50 text-purple-700 hover:bg-purple-100"
      onClick={() => onOpenReminder(userId)}
    >
      <IconBell className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Напоминание</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-amber-50 text-amber-700 hover:bg-amber-100"
      onClick={() => onOpenWarning(userId)}
    >
      <IconAlertCircle className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Предупреждение</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-red-50 text-red-700 hover:bg-red-100"
      onClick={() => onOpenImportant(userId)}
    >
      <IconUserExclamation className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Важное</span>
    </Button>
  </div>
);