interface IVoiceControls {
    isListening: boolean;
    isSpeaking: boolean;
    isBotTyping: boolean;
    onStartListening: () => void;
    onSpeak: () => void;
    speechError?: string;
}

export const VoiceControls = ({ isListening, isSpeaking, isBotTyping, onStartListening, onSpeak, speechError }: IVoiceControls) => {
    return(
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
    )
}
