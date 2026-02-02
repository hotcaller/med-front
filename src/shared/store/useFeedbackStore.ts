import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FeedbackMessage } from "@/shared/types/feedback";

interface FeedbackStore {
  messages: FeedbackMessage[];
  deletedIds: number[];

  isDeleted: (id: number) => boolean;
  deleteMessage: (id: number) => void;
}

export const useFeedbackStore = create<FeedbackStore>()(
  persist(
    (set, get) => ({
      messages: [],
      deletedIds: [],

      isDeleted: (id: number) => get().deletedIds.includes(id),

      deleteMessage: (id: number) => {
        set((state) => ({
          deletedIds: [...state.deletedIds, id],
        }));
      },
    }),
    {
      name: "feedback-store",
    }
  )
);
