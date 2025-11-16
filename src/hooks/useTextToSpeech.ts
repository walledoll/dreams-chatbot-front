// @/hooks/useTextToSpeech.ts
import { useState, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentMessageId(null);
    }
  }, []);

  const speak = useCallback((text: string, messageId: string) => {
    if (isSpeaking && currentMessageId === messageId) {
      stop();
      return;
    }

    stop(); // остановить предыдущее

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.9;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentMessageId(messageId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentMessageId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentMessageId(null);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [isSpeaking, currentMessageId]);



  return { isSpeaking, speak, stop, currentMessageId };
};