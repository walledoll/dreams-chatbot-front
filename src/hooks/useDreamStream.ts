import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useDreamStream = (
  onChunk: (chunk: string, done: boolean) => void,
  onError: (error: string) => void,
) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'], // только WS, без long polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('interpret:chunk', (data) => {
      onChunk(data.chunk, data.done);
    });

    socket.on('error', (data) => {
      onError(data.message);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendDream = (text: string, sessionId: string) => {
    socketRef.current?.emit('interpret:dream', { text, sessionId });
  };

  return { sendDream };
};