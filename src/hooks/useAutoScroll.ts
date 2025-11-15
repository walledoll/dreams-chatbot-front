import { useEffect, useRef } from "react";

export const useAutoScroll = (dependencies: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencies);
  return messagesEndRef;
};