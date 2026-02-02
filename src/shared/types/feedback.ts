type FeedbackStatus = "pending" | "answered";
type SortType = "newest" | "oldest" | "a-z" | "z-a";

interface FeedbackMessage {
  id: number;
  header: string;
  content: string;
  answer?: string; 
  user_id?: number;
  created_at: string; 
  answered_at?: string; 
}

export type { FeedbackMessage, FeedbackStatus, SortType };