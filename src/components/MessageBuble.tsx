import { SpeakButton } from "./SpeakButton";

export interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

interface IMessageBubble{
    message: Message;
    isLast?: boolean;
    isSpeaking: boolean;
    onSpeak: () => void;
    onStop: () => void;
}

export const MessageBubble = ({ message, isLast, isSpeaking, onSpeak, onStop }: IMessageBubble) => {
    return (
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

    )
}
