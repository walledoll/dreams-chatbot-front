import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useEffect, useState, useCallback } from 'react';
import { usePublicInterpretation } from '@/hooks/usePublicInterpretation';
import { Header } from './Header';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { MessageBubble } from './MessageBuble';
import { SendButton } from './SendButton';
import { TypingIndicator } from './TypingIndicator';
import { VoiceControls } from './VoiceControls';
import { useMessagesStore } from '@/store/store';

interface ChatInterfaceProps {
  onBackToLanding: () => void;
}

const cleanText = (text: string): string => {
  return text
    .replace(/\*\*/g, '')           // убираем жирный шрифт
    .replace(/^\s*-\s*/gm, '')      // убираем маркеры списка
    .replace(/^(\d+\.\s*)/gm, '')   // убираем нумерацию
    .replace(/\n+/g, '\n')          // схлопываем лишние переносы
    .trim();
};

export const ChatInterface = ({ onBackToLanding }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const { messages, addMessage } = useMessagesStore();
  const messagesEndRef = useAutoScroll([messages]);

  const { isListening, error: speechError, startListening } = useSpeechRecognition((text) => {
    setInputValue(text);
  });

  const { isSpeaking, speak, stop, currentMessageId } = useTextToSpeech(); // ← предполагаем, что хук возвращает currentMessageId

  const { mutate: interpretDream, isPending: isBotTyping } = usePublicInterpretation();

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
              message={{
                ...message,
                content: cleanText(message.content),
              }}
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