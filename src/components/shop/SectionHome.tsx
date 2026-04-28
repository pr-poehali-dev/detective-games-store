import Icon from "@/components/ui/icon";
import { GAMES, QUIZ_QUESTIONS } from "./data";
import type { Game, Section } from "./data";

interface Props {
  nav: (s: Section) => void;
  addToCart: (game: Game) => void;
  setSelectedGame: (game: Game) => void;
  quizStep: number;
  quizDone: boolean;
  recommendedGames: Game[];
  onQuizAnswer: (questionId: string, value: string) => void;
  onResetQuiz: () => void;
}

export default function SectionHome({
  nav,
  addToCart,
  setSelectedGame,
  quizStep,
  quizDone,
  recommendedGames,
  onQuizAnswer,
  onResetQuiz,
}: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover opacity-35"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/92a95b97-d2cf-46a0-816e-411304490d98.jpg)`,
            backgroundPosition: "75% center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="fade-in-up text-primary/80 tracking-[0.3em] uppercase text-xs font-sans mb-6">
            Магазин атмосферных настольных игр
          </p>
          <h1 className="fade-delay-1 font-serif text-5xl sm:text-7xl font-light leading-tight mb-6 text-foreground">
            Тайны ждут
            <br />
            <em className="italic text-primary">своего часа</em>
          </h1>
          <div className="fade-delay-2 gold-line w-24 mx-auto my-8" />
          <p className="fade-delay-2 text-muted-foreground text-lg max-w-lg mx-auto font-light leading-relaxed mb-10">
            Детективные настольные игры для тех, кто любит острые сюжеты, атмосферу и испытание для ума.
          </p>
          <div className="fade-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => nav("catalog")}
              className="candle-glow bg-primary text-primary-foreground px-8 py-3.5 font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm"
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-border/70 text-foreground px-8 py-3.5 font-sans text-sm uppercase tracking-widest hover:border-primary/60 hover:text-primary transition-all rounded-sm"
            >
              Подобрать игру
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/40 bg-card/40 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center px-4">
          {[
            { value: "120+", label: "Игр в каталоге" },
            { value: "4.9 ★", label: "Средний рейтинг" },
            { value: "8 000+", label: "Довольных игроков" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl sm:text-4xl text-primary mb-1">{s.value}</div>
              <div className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured games */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-primary/70 text-xs uppercase tracking-widest mb-3 font-sans">Выбор редакции</p>
          <h2 className="font-serif text-4xl font-light">Хиты сезона</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GAMES.slice(0, 3).map((game, i) => (
            <div
              key={game.id}
              className={`card-glow border border-border/60 rounded-sm overflow-hidden bg-card fade-delay-${i + 1} cursor-pointer group`}
              onClick={() => setSelectedGame(game)}
            >
              <div className="relative overflow-hidden h-48">
                <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-primary text-xs px-2 py-1 border border-primary/30 rounded-sm font-sans tracking-wider">
                  {game.genre}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-background/80 backdrop-blur-sm border border-primary/50 text-primary text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-sm">
                    Подробнее
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl mb-2">{game.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-primary">{game.price.toLocaleString()} ₽</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(game); }}
                    className="bg-primary text-primary-foreground px-4 py-2 text-xs font-sans uppercase tracking-wider hover:bg-primary/80 transition-colors rounded-sm"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => nav("catalog")}
            className="border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 px-8 py-3 text-sm font-sans uppercase tracking-widest transition-all rounded-sm"
          >
            Весь каталог →
          </button>
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz-section" className="bg-card/50 border-y border-border/40 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary/70 text-xs uppercase tracking-widest mb-3 font-sans">Персональный подбор</p>
            <h2 className="font-serif text-4xl font-light">Какая игра вам подойдёт?</h2>
          </div>

          {!quizDone ? (
            <div className="bg-background/60 border border-border/60 rounded-sm p-8">
              <div className="flex gap-2 mb-8">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= quizStep ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
              <h3 className="font-serif text-2xl text-center mb-8 font-light">
                {QUIZ_QUESTIONS[quizStep].question}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[quizStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onQuizAnswer(QUIZ_QUESTIONS[quizStep].id, opt.value)}
                    className="group border border-border/60 rounded-sm p-4 text-left hover:border-primary/60 hover:bg-primary/5 transition-all"
                  >
                    <span className="text-2xl mb-2 block">{opt.icon}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-sans">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="fade-in-up">
              <h3 className="font-serif text-2xl text-center mb-2 text-primary">Ваши рекомендации</h3>
              <p className="text-muted-foreground text-center mb-8 text-sm font-sans">Мы подобрали игры специально для вас</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {recommendedGames.map((game) => (
                  <div key={game.id} className="card-glow border border-border/60 rounded-sm overflow-hidden bg-card">
                    <div className="h-32 overflow-hidden relative">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg mb-1">{game.title}</h4>
                      <p className="text-muted-foreground text-xs mb-3 line-clamp-2 font-sans">{game.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-serif text-xl">{game.price.toLocaleString()} ₽</span>
                        <button
                          onClick={() => { addToCart(game); nav("cart"); }}
                          className="bg-primary text-primary-foreground px-3 py-1.5 text-xs font-sans uppercase tracking-wider hover:bg-primary/80 transition-colors rounded-sm"
                        >
                          Купить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onResetQuiz}
                  className="border border-border/60 text-muted-foreground hover:text-foreground px-6 py-2.5 text-sm font-sans uppercase tracking-wider transition-all rounded-sm"
                >
                  Пройти снова
                </button>
                <button
                  onClick={() => nav("catalog")}
                  className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-sans uppercase tracking-wider hover:bg-primary/80 transition-colors rounded-sm"
                >
                  Весь каталог
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
