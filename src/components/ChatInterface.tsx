import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePublicInterpretation } from '@/hooks/usePublicInterpretation';

// Types
interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBackToLanding: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'bot',
    content: 'Привет! Я здесь, чтобы помочь вам разобраться в ваших снах. Расскажите мне о сне, который вас интересует — не спешите, опишите то, что запомнилось больше всего.',
    timestamp: new Date(),
  },
];

// Custom hooks
const useAutoScroll = (dependencies: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencies);
  return messagesEndRef;
};

const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const addMessage = useCallback((message: Omit<Message, 'timestamp'>) => {
    const newMessage: Message = { ...message, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
  }, []);
  return { messages, addMessage };
};

// 🆕 Компонент кнопки озвучки
const SpeakButton: React.FC<{
  content: string;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
}> = ({ content, isSpeaking, onSpeak, onStop }) => (
  <button
    onClick={isSpeaking ? onStop : onSpeak}
    className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
    aria-label={isSpeaking ? 'Остановить озвучку' : 'Озвучить сообщение'}
  >
    {isSpeaking ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 4h12v16H6z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0 1.77-1.02 3.29-2.5 4.03v2.02c2.89-.86 5-3.54 5-6.75s-2.11-5.89-5-6.72v2.02c1.48.73 2.5 2.25 2.5 4.03z" />
      </svg>
    )}
  </button>
);

const Header: React.FC<{
  onBackToLanding: () => void;
  isBotTyping: boolean;
}> = ({ onBackToLanding, isBotTyping }) => (
  <header className="flex-none border-b border-border bg-card px-6 py-4">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <button
        onClick={onBackToLanding}
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="text-2xl">🌙</div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">сонИИк</h1>
          <p className="text-xs text-muted-foreground">
            {isBotTyping ? (
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft"></span>
                Бот печатает...
              </span>
            ) : (
              'Готов помочь'
            )}
          </p>
        </div>
      </button>
    </div>
  </header>
);

// 🆕 Обновлённый MessageBubble с кнопкой TTS
const MessageBubble: React.FC<{
  message: Message;
  isLast?: boolean;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
}> = ({ message, isLast, isSpeaking, onSpeak, onStop }) => (
  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
    <div className={`max-w-[85%] md:max-w-[70%] ${message.role === 'user' ? '' : 'flex gap-3'}`}>
      {message.role === 'bot' && (
        <div className="flex-none text-2xl">
          {isLast ? <span className="animate-pulse-soft">🌙</span> : '🌙'}
        </div>
      )}
      <div
        className={`rounded-2xl px-6 py-4 relative ${
          message.role === 'user'
            ? 'bg-user-message rounded-tr-md'
            : 'bg-bot-message rounded-tl-md'
        }`}
      >
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {/* Кнопка озвучки только для бота */}
        {message.role === 'bot' && (
          <div className="absolute top-2 right-2">
            <SpeakButton
              content={message.content}
              isSpeaking={isSpeaking}
              onSpeak={onSpeak}
              onStop={onStop}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start animate-fade-in">
    <div className="flex gap-3">
      <div className="text-2xl animate-pulse-soft">🌙</div>
      <div className="bg-bot-message rounded-2xl rounded-tl-md px-6 py-4">
        <div className="flex gap-1">
          {[0, 0.2, 0.4].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"
              style={{ animationDelay: `${delay}s` }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const VoiceControls: React.FC<{
  isListening: boolean;
  isSpeaking: boolean;
  isBotTyping: boolean;
  onStartListening: () => void;
  onSpeak: () => void;
  speechError?: string;
}> = ({ isListening, isSpeaking, isBotTyping, onStartListening, onSpeak, speechError }) => (
  <>
    <div className="absolute left-3 bottom-3 flex gap-2">
      <button
        onClick={onStartListening}
        disabled={isListening || isBotTyping}
        className={`p-2 rounded-full ${
          isListening ? 'bg-red-500 text-white' : 'bg-muted hover:bg-muted-foreground/10'
        }`}
        aria-label={isListening ? 'Остановить запись' : 'Голосовой ввод'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          {isListening ? (
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          ) : (
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.42 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          )}
        </svg>
      </button>

      {/* ⚠️ Этот глобальный TTS-контроль можно оставить или убрать — по желанию */}

    </div>

    {speechError && <p className="text-xs text-destructive text-center mt-1">{speechError}</p>}
  </>
);

const SendButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="absolute right-3 bottom-3 p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 hover:scale-110"
    aria-label="Отправить"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  </button>
);

// Main Component
export const ChatInterface = ({ onBackToLanding }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const { messages, addMessage } = useChatMessages();
  const messagesEndRef = useAutoScroll([messages]);

  const { isListening, error: speechError, startListening } = useSpeechRecognition((text) => {
    setInputValue(text);
  });

  const { isSpeaking, speak, stop, currentMessageId } = useTextToSpeech(); // ← предполагаем, что хук возвращает currentMessageId

  const { mutate: interpretDream, isPending: isBotTyping } = usePublicInterpretation();

  // ❌ УБРАНО: автоматическое озвучивание

  // Останавливаем, если бот печатает
  useEffect(() => {
    if (isBotTyping) {
      stop();
    }
  }, [isBotTyping, stop]);

  const handleSendMessage = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isBotTyping) return;

    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: text,
    });
    setInputValue('');

    interpretDream(text, {
      onSuccess: (data) => {
        const botReply = data || 'Извините, не удалось обработать ваш сон.';
        addMessage({
          id: Date.now().toString(),
          role: 'bot',
          content: botReply,
        });
      },
      onError: (error) => {
        console.error('Ошибка интерпретации:', error);
        addMessage({
          id: Date.now().toString(),
          role: 'bot',
          content: 'Не удалось получить толкование. Попробуйте позже.',
        });
      },
    });
  }, [inputValue, isBotTyping, addMessage, interpretDream]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = '56px';
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  };

  // Для глобальной кнопки (опционально)
  const handleSpeakLastBotMessage = () => {
    const lastBotMsg = [...messages].reverse().find((m) => m.role === 'bot');
    if (lastBotMsg) speak(lastBotMsg.content, lastBotMsg.id);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header onBackToLanding={onBackToLanding} isBotTyping={isBotTyping} />

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
              isSpeaking={isSpeaking && currentMessageId === message.id}
              onSpeak={() => speak(message.content, message.id)}
              onStop={stop}
            />
          ))}

          {isBotTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex-none border-t border-border bg-card px-6 py-6 ">
        <div className="max-w-4xl mx-auto">

          <div className="relative">
          <VoiceControls
            isListening={isListening}
            isSpeaking={isSpeaking}
            isBotTyping={isBotTyping}
            onStartListening={startListening}
            onSpeak={handleSpeakLastBotMessage}
            speechError={speechError || undefined}
          />
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onInput={handleInputResize}
              placeholder="Опишите свой сон..."
              disabled={isBotTyping}
              rows={1}
              className="w-full rounded-2xl bg-background overflow-auto border border-input px-15 py-4 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-all"
              style={{ minHeight: '56px', maxHeight: '200px' }}
            />
            <SendButton onClick={handleSendMessage} disabled={!inputValue.trim() || isBotTyping} />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            ИИ помогает анализировать, а не диагностирует
          </p>
        </div>
      </div>
    </div>
  );
};