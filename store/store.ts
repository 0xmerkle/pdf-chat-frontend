import { UserCredential, User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
export const userStore = create<{
  user: User | null;
  isAuthed: boolean;
  setUser: (user: User) => void;
  messages: { from: string; message: string; id: string }[];
  setMessages: (messages: { from: string; message: string; id: string }[]) => void;
}>((set, get) => ({
  user: null,
  isAuthed: false,
  messages: [],
  setUser: (user) => {
    console.log('uthing!');
    set({ user, isAuthed: true });
  },
  setMessages: (messages) => {
    const { messages: currentMessages } = get();
    // Create a new array of unique messages by filtering out messages whose IDs already exist
    const newMessages = messages.filter((m) => !currentMessages.some((cm) => cm.id === m.id));
    // Add the new messages to the current messages array
    const updatedMessages = [...currentMessages, ...newMessages];
    set({ messages: updatedMessages });
  },
}));
