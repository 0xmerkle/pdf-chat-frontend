import { UserCredential, User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
  persist<{
    user: User | null;
    isAuthed: boolean;
    setUser: (user: User) => void;
  }>(
    (set, get) => ({
      user: null,
      isAuthed: false,
      setUser: (user) => {
        console.log('uthing!');
        set({ user, isAuthed: true });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (state) => {
        console.log('hydration starting');
        console.log(state);

        return (s, error) => {
          if (error) {
            console.log('error on rehydration:', error);
          } else {
            console.log('hydration finished!');
            console.log(s);
          }
        };
      },
    }
  )
);
