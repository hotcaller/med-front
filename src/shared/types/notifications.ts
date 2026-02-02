
type FilterOptions = "all" | "new" | "old" | "favourite";
type SortType = "newest" | "oldest" | "a-z" | "z-a";
type NotificationType = "news" | "reminder" | "warning" | "important"
type Notification = {
  id: string;
  header: string;
  message: string;
  type: NotificationType
  created_at: string
};


export type { FilterOptions, SortType, Notification, NotificationType};
