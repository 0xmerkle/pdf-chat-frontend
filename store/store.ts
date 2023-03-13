import { UserCredential, User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create<{
  user: User | null;
  isAuthed: boolean;
  setUser: (user: User) => void;
  messages: { from: string; message: string }[];
  setMessages: (messages: { from: string; message: string }[]) => void;
}>((set) => ({
  user: null,
  isAuthed: false,
  messages: [],
  setUser: (user) => {
    console.log('uthing!');
    set({ user, isAuthed: true });
  },
  setMessages: (msg) => {
    set((state) => ({ messages: [...state.messages, ...msg] }));
  },
}));
