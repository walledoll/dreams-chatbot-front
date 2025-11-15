import type { Message } from '@/components/MessageBuble'
import { create } from 'zustand'

interface MessagesState {
    messages: Message[];
    addMessage: (message: Omit<Message, 'timestamp'>) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
    messages: [
        {
        id: '1',
        role: 'bot',
        content: 'Привет! Я здесь, чтобы помочь вам разобраться в ваших снах. Расскажите мне о сне, который вас интересует — не спешите, опишите то, что запомнилось больше всего.',
        timestamp: new Date(),
        },
    ],
    addMessage: (newMessage) => {
        const message: Message = { ...newMessage, timestamp: new Date() };
        set((state) => ({
        messages: [...state.messages, message], // ← добавляем в конец
        }));
    },
}));