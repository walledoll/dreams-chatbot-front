import { useState } from "react";

interface LandingProps {
  onStartChat: () => void;
}

export const Landing = ({ onStartChat }: LandingProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌙</div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">сонИИк</h1>
                <p className="text-sm text-muted-foreground">поговори с подсознанием</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
                    Поговори с<br />подсознанием
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                    ИИ-собеседник, который задает правильные вопросы и помогает найти смысл в ваших снах
                  </p>
                </div>

                <button
                  onClick={onStartChat}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                >
                  <span className="relative z-10">Начать разговор</span>
                  <div className={`absolute inset-0 rounded-2xl bg-primary/80 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
                </button>

                {/* Benefits */}
                <div className="grid gap-4 pt-8">
                  {[
                    { icon: "❓", text: "Задаем правильные вопросы" },
                    { icon: "💭", text: "Помогаем найти ваши личные ассоциации" },
                    { icon: "🔒", text: "Конфиденциально и безопасно" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-2xl">{benefit.icon}</div>
                      <p className="text-foreground font-medium">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={''}
                    alt="Абстрактная иллюстрация снов"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example Dialog Section */}
      <div className="px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto"><h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-foreground">
            Как проходит разговор
          </h3>
          
          <div className="space-y-4">
            {/* User Message Example */}
            <div className="flex justify-end animate-slide-up">
              <div className="max-w-[80%] md:max-w-[60%]">
                <div className="bg-user-message rounded-2xl rounded-tr-md px-6 py-4">
                  <p className="text-foreground">
                    Мне приснился сон, где я летал над городом...
                  </p>
                </div>
              </div>
            </div>

            {/* Bot Message Example */}
            <div className="flex justify-start animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="max-w-[80%] md:max-w-[60%]">
                <div className="flex gap-3">
                  <div className="text-2xl">🌙</div>
                  <div className="bg-bot-message rounded-2xl rounded-tl-md px-6 py-4">
                    <p className="text-foreground">
                      Интересно! А что вы чувствовали во время полета?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Message Example */}
            <div className="flex justify-end animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="max-w-[80%] md:max-w-[60%]">
                <div className="bg-user-message rounded-2xl rounded-tr-md px-6 py-4">
                  <p className="text-foreground">
                    Сначала было страшно, но потом ощутил свободу
                  </p>
                </div>
              </div>
            </div>

            {/* Bot Message Example */}
            <div className="flex justify-start animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="max-w-[80%] md:max-w-[60%]">
                <div className="flex gap-3">
                  <div className="text-2xl">🌙</div>
                  <div className="bg-bot-message rounded-2xl rounded-tl-md px-6 py-4">
                    <p className="text-foreground">
                      Эта трансформация от страха к свободе может отражать что-то важное. Были ли в последнее время ситуации, где вы чувствовали похожую динамику?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            ИИ помогает анализировать, а не диагностирует
          </p>
        </div>
      </footer>
    </div>
  );
};