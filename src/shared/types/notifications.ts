
type NotificationType = "all" | "new" | "old" | "favourite";
type SortType = "newest" | "oldest" | "a-z" | "z-a";

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
};


export type { NotificationType, SortType, Notification };
