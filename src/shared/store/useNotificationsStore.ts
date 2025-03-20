import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationsStore {
  starredIds: string[];
  checkedIds: string[];
  deletedIds: string[];

  isStarred: (id: string) => boolean;
  toggleStar: (id: string) => void;
  
  isChecked: (id: string) => boolean;
  markAsChecked: (id: string) => void;
  markAllAsChecked: (ids: string[]) => void;

  isDeleted: (id: string) => boolean;
  deleteNotification: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      starredIds: [],
      checkedIds: [],
      deletedIds: [],
      
      // Star methods
      isStarred: (id: string) => {
        return get().starredIds.includes(id);
      },
      
      toggleStar: (id: string) => {
        const { starredIds } = get();
        if (starredIds.includes(id)) {
          set({ starredIds: starredIds.filter(starredId => starredId !== id) });
        } else {
          set({ starredIds: [...starredIds, id] });
        }
      },
      
      // Read/checked methods
      isChecked: (id: string) => {
        return get().checkedIds.includes(id);
      },
      
      markAsChecked: (id: string) => {
        const { checkedIds } = get();
        if (!checkedIds.includes(id)) {
          set({ checkedIds: [...checkedIds, id] });
        }
      },
      
      markAllAsChecked: (ids: string[]) => {
        const { checkedIds } = get();
        const newCheckedIds = [...checkedIds];
        
        ids.forEach(id => {
          if (!newCheckedIds.includes(id)) {
            newCheckedIds.push(id);
          }
        });
        
        set({ checkedIds: newCheckedIds });
      },

      isDeleted: (id: string) => {
        return get().deletedIds.includes(id);
      },

      deleteNotification: (id: string) => {
        const { deletedIds } = get();
        if (!deletedIds.includes(id)) {
          set({ deletedIds: [...deletedIds, id] });
        }
      },

    }),
    {
      name: 'notifications-store', 
    }
  )
);