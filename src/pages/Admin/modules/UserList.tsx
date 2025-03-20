import { Button } from "@/components/ui/button";
import {
  IconAlertCircle,
  IconBell,
  IconNews,
  IconUserExclamation,
} from "@tabler/icons-react";

export type User = {
    id: number;
    name: string
}

interface UserListProps {
  users: User[];
  onOpenNews: () => void;
  onOpenReminder: () => void;
  onOpenWarning: () => void;
  onOpenImportant: () => void;
}

export const UserList = ({
  users,
  onOpenNews,
  onOpenReminder,
  onOpenWarning,
  onOpenImportant,
}: UserListProps) => (
  <div className="divide-y">
    {users.map((user) => (
      <div
        key={user.id}
        className="flex flex-col justify-between gap-4 p-6 hover:bg-gray-50 sm:flex-row sm:items-center"
      >
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">ID: {user.id}</p>
        </div>
        <NotificationButtons
          onOpenNews={onOpenNews}
          onOpenReminder={onOpenReminder}
          onOpenWarning={onOpenWarning}
          onOpenImportant={onOpenImportant}
        />
      </div>
    ))}
  </div>
);

const NotificationButtons = ({
  onOpenNews,
  onOpenReminder,
  onOpenWarning,
  onOpenImportant,
}: Omit<UserListProps, "users">) => (
  <div className="flex flex-wrap gap-2">
    <Button
      variant="outline"
      className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
      onClick={onOpenNews}
    >
      <IconNews className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Новость</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-purple-50 text-purple-700 hover:bg-purple-100"
      onClick={onOpenReminder}
    >
      <IconBell className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Напоминание</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-amber-50 text-amber-700 hover:bg-amber-100"
      onClick={onOpenWarning}
    >
      <IconAlertCircle className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Предупреждение</span>
    </Button>
    <Button
      variant="outline"
      className="gap-2 bg-red-50 text-red-700 hover:bg-red-100"
      onClick={onOpenImportant}
    >
      <IconUserExclamation className="h-4 w-4" />
      <span className="sr-only sm:not-sr-only">Важное</span>
    </Button>
  </div>
);