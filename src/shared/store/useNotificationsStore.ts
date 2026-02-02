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
      starredIds: [],
      checkedIds: [],
      deletedIds: [],
      
      isStarred: (id: string) => {
        const stringId = String(id);
        return get().starredIds.includes(stringId);
      },
      
      toggleStar: (id: string) => {
        const stringId = String(id);
        const { starredIds } = get();
        
        if (starredIds.includes(stringId)) {
          set({ starredIds: starredIds.filter(starredId => starredId !== stringId) });
        } else {
          set({ starredIds: [...starredIds, stringId] });
        }
      },
      
      isChecked: (id: string) => {
        const stringId = String(id);
        return get().checkedIds.includes(stringId);
      },
      
      markAsChecked: (id: string) => {
        const stringId = String(id);
        const { checkedIds } = get();
        
        if (!checkedIds.includes(stringId)) {
          set({ checkedIds: [...checkedIds, stringId] });
        }
      },
      
      markAllAsChecked: (ids: string[]) => {
        const { checkedIds } = get();
        const newCheckedIds = [...checkedIds];
        
        ids.forEach(id => {
          const stringId = String(id);
          if (!newCheckedIds.includes(stringId)) {
            newCheckedIds.push(stringId);
          }
        });
        
        set({ checkedIds: newCheckedIds });
      },

      isDeleted: (id: string) => {
        const stringId = String(id);
        return get().deletedIds.includes(stringId);
      },

      deleteNotification: (id: string) => {
        const stringId = String(id);
        const { deletedIds } = get();
        set({ deletedIds: [...deletedIds, stringId] });
      },
    }),
    {
      name: 'notifications-store',
      migrate: (persistedState: any, version) => {
        return {
          ...persistedState,
          starredIds: persistedState.starredIds?.map(String) || [],
          checkedIds: persistedState.checkedIds?.map(String) || [],
          deletedIds: persistedState.deletedIds?.map(String) || [],
        };
      },
      version: 1, 
    }
  )
);