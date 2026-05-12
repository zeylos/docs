import { create } from 'zustand';

interface CommentSidebarStore {
  threadsSidebarTarget: HTMLElement | null;
  setThreadsSidebarTarget: (el: HTMLElement | null) => void;
}

export const useCommentSidebarStore = create<CommentSidebarStore>((set) => ({
  threadsSidebarTarget: null,
  setThreadsSidebarTarget: (threadsSidebarTarget) => {
    set(() => ({ threadsSidebarTarget }));
  },
}));
