import { Link } from "react-router-dom";

interface HeaderProps {
    isBotTyping: boolean;
}

export const Header = ({ isBotTyping } :HeaderProps) => {
    return (
  <header className="flex-none border-b border-border bg-card px-6 py-4 w-full">
    <div className="max-w-5xl mx-auto flex items-center justify-between">
      <Link
        to='/'
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="text-2xl">🌙</div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">сонИИк</h1>
          <p className="text-xs text-muted-foreground">
            {isBotTyping ? (
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft"></span>
                Бот печатает...
              </span>
            ) : (
              'Готов помочь'
            )}
          </p>
        </div>
      </Link>
    </div>
  </header>
);
}
