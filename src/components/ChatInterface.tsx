import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBackToLanding: () => void;
}

export const ChatInterface = ({ onBackToLanding }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Привет! Я здесь, чтобы помочь вам разобраться в ваших снах. Расскажите мне о сне, который вас интересует — не спешите, опишите то, что запомнилось больше всего.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Интересно! Расскажите подробнее — какие детали вам запомнились больше всего?",
        "А какие эмоции вы испытывали во время этого сна?",
        "Это важный момент. Ассоциируется ли это с чем-то из вашей жизни?",
        "Давайте копнем глубже. Что для вас значит этот образ?",
        "Есть ли в вашей жизни сейчас ситуация, которая могла бы вызвать такой сон?",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
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
                {isConnected ? (
                  isTyping ? (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft"></span>
                      Бот печатает...
                    </span>
                  ) : (
                    "Онлайн"
                  )
                ) : (
                  "Ошибка соединения"
                )}
              </p>
            </div>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-slide-up`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] ${
                  message.role === "user" ? "" : "flex gap-3"
                }`}
              >
                {message.role === "bot" && (
                  <div className="flex-none text-2xl">
                    {isTyping && index === messages.length - 1 ? (
                      <span className="animate-pulse-soft">🌙</span>
                    ) : (
                      "🌙"
                    )}
                  </div>
                )}
                <div
                  className={`rounded-2xl px-6 py-4 ${
                    message.role === "user"
                      ? "bg-user-message rounded-tr-md"
                      : "bg-bot-message rounded-tl-md"
                  }`}
                >
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3">
                <div className="text-2xl animate-pulse-soft">🌙</div>
                <div className="bg-bot-message rounded-2xl rounded-tl-md px-6 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></span>
                    <span
                      className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none border-t border-border bg-card px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Опишите свой сон..."
              disabled={isTyping || !isConnected}
              rows={1}
              className="w-full resize-none rounded-2xl bg-background border border-input px-6 py-4 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                minHeight: "56px",
                maxHeight: "200px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "56px";
                target.style.height = target.scrollHeight + "px";
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || !isConnected}
              className="absolute right-3 bottom-3 p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
              aria-label="Отправить"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            ИИ помогает анализировать, а не диагностирует
          </p>
        </div>
      </div>
    </div>
  );
};