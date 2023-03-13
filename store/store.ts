import { UserCredential, User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create<{
  user: User | null;
  isAuthed: boolean;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  isAuthed: false,
  setUser: (user) => {
    console.log('uthing!');
    set({ user, isAuthed: true });
  },
}));
