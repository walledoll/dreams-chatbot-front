interface ISendButton {
    onClick: () => void; 
    disabled: boolean
}

export const SendButton = ({ onClick, disabled }: ISendButton) => {
    return (
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
    )
}