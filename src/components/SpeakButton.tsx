interface ISpeakButton{
    content: string;
    isSpeaking: boolean;
    onSpeak: () => void;
    onStop: () => void;
}

export const SpeakButton = ({isSpeaking, onStop, onSpeak}: ISpeakButton) => {
    return (
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
}