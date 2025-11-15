export const TypingIndicator = () => {
    return (
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
}