import { useState } from "react";
import Icon from "@/components/ui/icon";

const GAMES = [
  {
    id: 1,
    title: "Особняк Теней",
    genre: "Расследование",
    players: "2–6",
    duration: "90–150 мин",
    difficulty: "Средняя",
    price: 3490,
    tags: ["атмосферная", "кооператив", "интрига"],
    description: "Расследуйте загадочное убийство в старом поместье. Каждая улика ведёт к новой тайне.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/3e479018-542b-4436-a2b6-69dd9407c9f1.jpg",
  },
  {
    id: 2,
    title: "Код Молчания",
    genre: "Шпионаж",
    players: "3–5",
    duration: "60–90 мин",
    difficulty: "Сложная",
    price: 2890,
    tags: ["блеф", "стратегия", "напряжение"],
    description: "Шпионский триллер, где каждый игрок скрывает свою роль. Доверяй, но проверяй.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/f70dbd8e-316c-41d0-9c95-85e6ead7d1b1.jpg",
  },
  {
    id: 3,
    title: "Туман Аркхэма",
    genre: "Мистика",
    players: "1–4",
    duration: "120–180 мин",
    difficulty: "Эксперт",
    price: 4290,
    tags: ["соло", "хоррор", "нарратив"],
    description: "Погрузитесь в мир древних ужасов. Раскройте тайну, пока рассудок не угас.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/13058333-333a-4383-93aa-46202dc6db29.jpg",
  },
  {
    id: 4,
    title: "Последний Свидетель",
    genre: "Детектив",
    players: "2–4",
    duration: "45–75 мин",
    difficulty: "Лёгкая",
    price: 1990,
    tags: ["быстрая", "логика", "семейная"],
    description: "Найдите убийцу прежде, чем он исчезнет. Идеально для первых шагов в детективе.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/6fc71366-fa5e-4b2d-981d-3cd7bcf5c867.jpg",
  },
  {
    id: 5,
    title: "Зеркальный Лабиринт",
    genre: "Психологический",
    players: "2–5",
    duration: "60–90 мин",
    difficulty: "Средняя",
    price: 3190,
    tags: ["психология", "обман", "нестандартная"],
    description: "Реальность или иллюзия? Каждый ход меняет правила игры.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/c67adbea-18de-47ce-8bca-970b47291acb.jpg",
  },
  {
    id: 6,
    title: "Охота на Тень",
    genre: "Приключение",
    players: "4–8",
    duration: "90–120 мин",
    difficulty: "Средняя",
    price: 3790,
    tags: ["большая компания", "ролевая", "захватывающая"],
    description: "Город захвачен таинственными похищениями. Команда сыщиков против Мастера Теней.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/e9fab356-bf5f-4e4c-8241-aeeb62d00e40.jpg",
  },
  {
    id: 7,
    title: "Дело Оливии Грин",
    genre: "Детектив",
    players: "2–5",
    duration: "75–120 мин",
    difficulty: "Средняя",
    price: 3290,
    tags: ["нуар", "интрига", "расследование"],
    description: "1932 год. Светская львица Оливия Грин найдена мёртвой в своей гримёрной за час до премьеры. Все улыбались ей в лицо — и все желали её смерти. Распутайте клубок зависти, страсти и тайных сговоров, пока следы не простыли.",
    image: "https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/e28a3967-7d07-4a7c-a47b-74523234c110.jpg",
  },
];

const QUIZ_QUESTIONS = [
  {
    id: "mood",
    question: "Какое настроение вам ближе?",
    options: [
      { label: "Мрачная атмосфера", icon: "🌑", value: "dark" },
      { label: "Острый интеллект", icon: "🧩", value: "logic" },
      { label: "Напряжённый экшн", icon: "⚡", value: "action" },
      { label: "Глубокий нарратив", icon: "📜", value: "narrative" },
    ],
  },
  {
    id: "group",
    question: "С кем вы играете?",
    options: [
      { label: "Один / вдвоём", icon: "🕯️", value: "solo" },
      { label: "Небольшая компания", icon: "🔍", value: "small" },
      { label: "Большая компания", icon: "🎭", value: "large" },
      { label: "Всё равно", icon: "♟️", value: "any" },
    ],
  },
  {
    id: "time",
    question: "Сколько времени готовы тратить?",
    options: [
      { label: "До часа", icon: "⏱️", value: "short" },
      { label: "1–2 часа", icon: "🕐", value: "medium" },
      { label: "Весь вечер", icon: "🌙", value: "long" },
      { label: "Неважно", icon: "∞", value: "any" },
    ],
  },
];

const ABOUT_ITEMS = [
  {
    icon: "BookOpen",
    title: "Живые истории",
    text: "Каждая игра — это самостоятельная история с разными финалами. Два прохождения никогда не совпадут.",
  },
  {
    icon: "Users",
    title: "Для любой компании",
    text: "От камерных игр для двоих до эпических приключений для восьми человек — найдём игру под ваш круг.",
  },
  {
    icon: "Star",
    title: "Отбор вручную",
    text: "Каждая игра проверена нашей командой. Мы добавляем только то, во что играем сами.",
  },
  {
    icon: "Zap",
    title: "Быстрая доставка",
    text: "Отправляем в день заказа. Курьер или почта — выбираете сами.",
  },
];

type CartItem = { id: number; title: string; price: number; qty: number };
type Section = "home" | "catalog" | "about" | "cart";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [filterGenre, setFilterGenre] = useState<string>("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "ok" | "error">("idle");
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState<"courier" | "post" | "pickup">("courier");

  const DELIVERY_OPTIONS = [
    { id: "courier" as const, label: "Курьер", price: 350, icon: "Truck", desc: "1–2 дня" },
    { id: "post" as const, label: "Почта России", price: 190, icon: "Mail", desc: "5–10 дней" },
    { id: "pickup" as const, label: "Самовывоз", price: 0, icon: "MapPin", desc: "Бесплатно" },
  ];

  const PROMO_CODES: Record<string, number> = {
    "ТАЙНА10": 10,
    "ДЕТЕКТИВ15": 15,
    "МРАК20": 20,
    "ТАЙНА МАВРИКА": 100,
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoStatus("ok");
    } else {
      setDiscount(0);
      setPromoStatus("error");
    }
  };

  const resetPromo = () => {
    setPromoCode("");
    setPromoStatus("idle");
    setDiscount(0);
  };

  const addToCart = (game: (typeof GAMES)[0]) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === game.id);
      if (exists) return prev.map((i) => i.id === game.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: game.id, title: game.title, price: game.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleQuizAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...quizAnswers, [questionId]: value };
    setQuizAnswers(newAnswers);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizDone(false);
  };

  const recommendedGames = quizDone
    ? GAMES.slice(0, 2) // в будущем — реальная логика подбора
    : [];

  const genres = ["Все", ...Array.from(new Set(GAMES.map((g) => g.genre)))];
  const filteredGames = filterGenre === "Все" ? GAMES : GAMES.filter((g) => g.genre === filterGenre);

  const nav = (s: Section) => {
    setActiveSection(s);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, hsla(38,50%,20%,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, hsla(220,40%,10%,0.8) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-md bg-background/85">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => nav("home")}
            className="font-serif text-xl tracking-wide flex items-center gap-2"
          >
            <span className="text-primary flicker">🕯️</span>
            <span className="text-gold-shimmer font-bold text-2xl">Мрачный Детектив</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {(["home", "catalog", "about", "cart"] as Section[]).map((s) => {
              const labels: Record<Section, string> = {
                home: "Главная",
                catalog: "Каталог",
                about: "О играх",
                cart: "Корзина",
              };
              return (
                <button
                  key={s}
                  onClick={() => nav(s)}
                  className={`relative text-sm tracking-wider uppercase hover-underline transition-colors ${
                    activeSection === s
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {labels[s]}
                  {s === "cart" && cartCount > 0 && (
                    <span className="ml-1.5 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 font-sans">
                      {cartCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-3">
            {cartCount > 0 && (
              <button onClick={() => nav("cart")} className="relative p-2">
                <Icon name="ShoppingBag" size={20} className="text-foreground" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-card/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3">
            {(["home", "catalog", "about", "cart"] as Section[]).map((s) => {
              const labels: Record<Section, string> = {
                home: "Главная",
                catalog: "Каталог",
                about: "О играх",
                cart: "Корзина",
              };
              return (
                <button
                  key={s}
                  onClick={() => nav(s)}
                  className={`text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                    activeSection === s ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {labels[s]}
                  {s === "cart" && cartCount > 0 && ` (${cartCount})`}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-16">

        {/* ══════════════════════════════
            HOME
        ══════════════════════════════ */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section
              className="min-h-[92vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
            >
              {/* Hero background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/92a95b97-d2cf-46a0-816e-411304490d98.jpg)` }}
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

              {/* Scroll hint */}
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

            {/* Featured games (3 cards) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
              <div className="text-center mb-12">
                <p className="text-primary/70 text-xs uppercase tracking-widest mb-3 font-sans">Выбор редакции</p>
                <h2 className="font-serif text-4xl font-light">Хиты сезона</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {GAMES.slice(0, 3).map((game, i) => (
                  <div
                    key={game.id}
                    className={`card-glow border border-border/60 rounded-sm overflow-hidden bg-card fade-delay-${i + 1}`}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-primary text-xs px-2 py-1 border border-primary/30 rounded-sm font-sans tracking-wider">
                        {game.genre}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-xl mb-2">{game.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{game.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl text-primary">{game.price.toLocaleString()} ₽</span>
                        <button
                          onClick={() => addToCart(game)}
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
                    {/* Progress */}
                    <div className="flex gap-2 mb-8">
                      {QUIZ_QUESTIONS.map((_, i) => (
                        <div
                          key={i}
                          className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                            i <= quizStep ? "bg-primary" : "bg-border"
                          }`}
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
                          onClick={() => handleQuizAnswer(QUIZ_QUESTIONS[quizStep].id, opt.value)}
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
                        onClick={resetQuiz}
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
        )}

        {/* ══════════════════════════════
            CATALOG
        ══════════════════════════════ */}
        {activeSection === "catalog" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10">
              <p className="text-primary/70 text-xs uppercase tracking-widest mb-2 font-sans">Коллекция</p>
              <h2 className="font-serif text-5xl font-light mb-6">Каталог игр</h2>
              <div className="gold-line w-20 mb-8" />

              {/* Genre filter */}
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilterGenre(g)}
                    className={`px-4 py-1.5 text-xs font-sans uppercase tracking-wider border rounded-sm transition-all ${
                      filterGenre === g
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, i) => (
                <div
                  key={game.id}
                  className={`card-glow border border-border/60 rounded-sm overflow-hidden bg-card fade-delay-${Math.min(i + 1, 4)}`}
                >
                  <div className="relative overflow-hidden h-52">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-65 hover:opacity-85 transition-all duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-background/80 backdrop-blur-sm text-primary text-xs px-2 py-1 border border-primary/30 rounded-sm font-sans">
                        {game.genre}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-background/80 backdrop-blur-sm text-muted-foreground text-xs px-2 py-1 border border-border/40 rounded-sm font-sans">
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl mb-2">{game.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 font-sans">{game.description}</p>

                    <div className="flex gap-4 text-xs text-muted-foreground font-sans mb-4">
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={12} />
                        {game.players}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {game.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-5">
                      {game.tags.map((t) => (
                        <span key={t} className="text-xs border border-border/40 text-muted-foreground px-2 py-0.5 rounded-sm font-sans">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl text-primary">{game.price.toLocaleString()} ₽</span>
                      <button
                        onClick={() => addToCart(game)}
                        className="bg-primary text-primary-foreground px-4 py-2 text-xs font-sans uppercase tracking-wider hover:bg-primary/80 transition-colors rounded-sm"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            ABOUT
        ══════════════════════════════ */}
        {activeSection === "about" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[50vh] flex items-center justify-center text-center px-4 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/89c83d3b-009a-4bfb-b23d-711c999c6186/files/6d7189d6-247e-4db4-9a9f-c765671aad2b.jpg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background" />
              <div className="relative z-10">
                <p className="text-primary/70 text-xs uppercase tracking-widest mb-4 font-sans fade-in-up">Наша философия</p>
                <h2 className="font-serif text-5xl sm:text-6xl font-light fade-delay-1">О детективных играх</h2>
                <div className="gold-line w-24 mx-auto mt-6 fade-delay-2" />
              </div>
            </section>

            {/* Manifesto */}
            <section className="max-w-3xl mx-auto px-4 py-16 text-center">
              <p className="font-serif text-xl sm:text-2xl font-light leading-relaxed text-foreground/90 italic">
                «Детективная игра — это не просто развлечение. Это совместное погружение в тайну, 
                где каждый игрок становится частью живой истории.»
              </p>
              <div className="gold-line w-16 mx-auto mt-8" />
            </section>

            {/* Features */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ABOUT_ITEMS.map((item, i) => (
                  <div
                    key={item.title}
                    className={`border border-border/50 rounded-sm p-7 bg-card/60 card-glow fade-delay-${i + 1}`}
                  >
                    <div className="w-10 h-10 border border-primary/40 rounded-sm flex items-center justify-center mb-5 bg-primary/5">
                      <Icon name={item.icon} size={18} className="text-primary" />
                    </div>
                    <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Genres explained */}
            <section className="bg-card/40 border-y border-border/40 py-16 px-4">
              <div className="max-w-5xl mx-auto">
                <h3 className="font-serif text-3xl text-center mb-10 font-light">Жанры в нашем каталоге</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { emoji: "🔎", name: "Расследование", desc: "Найдите улики и вычислите преступника" },
                    { emoji: "🕵️", name: "Шпионаж", desc: "Блеф, роли и скрытые мотивы" },
                    { emoji: "👻", name: "Мистика", desc: "Паранормальные явления и ужас" },
                    { emoji: "🧠", name: "Психологический", desc: "Игры с восприятием и доверием" },
                    { emoji: "⚔️", name: "Приключение", desc: "Масштабные истории с приключениями" },
                    { emoji: "🃏", name: "Детектив", desc: "Классика криминальных расследований" },
                  ].map((g) => (
                    <div key={g.name} className="border border-border/40 rounded-sm p-4 bg-background/40 hover:border-primary/40 transition-colors">
                      <span className="text-2xl mb-2 block">{g.emoji}</span>
                      <h4 className="font-serif text-base mb-1">{g.name}</h4>
                      <p className="text-muted-foreground text-xs font-sans leading-relaxed">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center px-4">
              <h3 className="font-serif text-4xl font-light mb-6">Готовы раскрыть тайну?</h3>
              <button
                onClick={() => nav("catalog")}
                className="candle-glow bg-primary text-primary-foreground px-10 py-4 font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm"
              >
                Перейти к каталогу
              </button>
            </section>
          </div>
        )}

        {/* ══════════════════════════════
            CART
        ══════════════════════════════ */}
        {activeSection === "cart" && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10">
              <p className="text-primary/70 text-xs uppercase tracking-widest mb-2 font-sans">Ваш выбор</p>
              <h2 className="font-serif text-5xl font-light">Корзина</h2>
              <div className="gold-line w-16 mt-4" />
            </div>

            {cart.length === 0 ? (
              <div className="border border-border/40 rounded-sm p-16 text-center bg-card/40">
                <div className="text-5xl mb-4">🕯️</div>
                <h3 className="font-serif text-2xl mb-3 text-muted-foreground font-light">Корзина пуста</h3>
                <p className="text-muted-foreground text-sm mb-8 font-sans">Тайны ждут вас в каталоге</p>
                <button
                  onClick={() => nav("catalog")}
                  className="bg-primary text-primary-foreground px-8 py-3 font-sans text-sm uppercase tracking-widest hover:bg-primary/80 transition-colors rounded-sm"
                >
                  Перейти к каталогу
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="border border-border/50 rounded-sm p-5 bg-card flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg">{item.title}</h4>
                        <p className="text-muted-foreground text-sm font-sans">{item.price.toLocaleString()} ₽ × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-xl text-primary">{(item.price * item.qty).toLocaleString()} ₽</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border border-border/50 rounded-sm p-6 bg-card">
                  <div className="gold-line mb-5" />

                  {/* Delivery */}
                  <div className="mb-5">
                    <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-2">Доставка</p>
                    <div className="flex flex-col gap-2">
                      {DELIVERY_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setDelivery(opt.id)}
                          className={`flex items-center justify-between px-4 py-3 rounded-sm border transition-all text-left ${
                            delivery === opt.id
                              ? "border-primary/60 bg-primary/5"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                              delivery === opt.id ? "border-primary" : "border-muted-foreground/40"
                            }`}>
                              {delivery === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <Icon name={opt.icon} size={14} className={delivery === opt.id ? "text-primary" : "text-muted-foreground"} />
                            <div>
                              <span className="text-sm font-sans text-foreground">{opt.label}</span>
                              <span className="text-xs text-muted-foreground font-sans ml-2">{opt.desc}</span>
                            </div>
                          </div>
                          <span className={`text-sm font-sans ${delivery === opt.id ? "text-primary" : "text-muted-foreground"}`}>
                            {opt.price === 0 ? "Бесплатно" : `${opt.price} ₽`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="mb-5">
                    <p className="text-muted-foreground text-xs font-sans uppercase tracking-wider mb-2">Промокод</p>
                    {promoStatus === "ok" ? (
                      <div className="flex items-center justify-between border border-primary/50 bg-primary/5 rounded-sm px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-primary" />
                          <span className="text-primary text-sm font-sans font-medium">{promoCode.toUpperCase()}</span>
                          <span className="text-primary/70 text-xs font-sans">— скидка {discount}%</span>
                        </div>
                        <button onClick={resetPromo} className="text-muted-foreground hover:text-foreground transition-colors">
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => { setPromoCode(e.target.value); setPromoStatus("idle"); }}
                          onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                          placeholder="Введите промокод"
                          className={`flex-1 bg-background border rounded-sm px-4 py-2.5 text-sm font-sans outline-none transition-colors placeholder:text-muted-foreground/50 ${
                            promoStatus === "error"
                              ? "border-destructive/60 focus:border-destructive"
                              : "border-border/60 focus:border-primary/60"
                          }`}
                        />
                        <button
                          onClick={applyPromo}
                          className="border border-border/60 hover:border-primary/60 text-muted-foreground hover:text-foreground px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-all rounded-sm whitespace-nowrap"
                        >
                          Применить
                        </button>
                      </div>
                    )}
                    {promoStatus === "error" && (
                      <p className="text-destructive text-xs font-sans mt-1.5 flex items-center gap-1">
                        <Icon name="AlertCircle" size={12} />
                        Промокод не найден
                      </p>
                    )}
                  </div>

                  {/* Totals */}
                  {(() => {
                    const deliveryPrice = DELIVERY_OPTIONS.find(o => o.id === delivery)?.price ?? 0;
                    const discountedDelivery = Math.round(deliveryPrice * (1 - discount / 100));
                    const discounted = Math.round(cartTotal * (1 - discount / 100));
                    const total = discounted + discountedDelivery;
                    return (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-muted-foreground font-sans text-sm">Товары</span>
                          <span className={`font-sans text-sm ${discount > 0 ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {cartTotal.toLocaleString()} ₽
                          </span>
                        </div>
                        {discount > 0 && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-primary/80 font-sans text-sm">Скидка {discount}%</span>
                            <span className="text-primary font-sans text-sm">−{Math.round((cartTotal + deliveryPrice) * discount / 100).toLocaleString()} ₽</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-muted-foreground font-sans text-sm">Доставка</span>
                          <span className="text-foreground font-sans text-sm flex items-center gap-2">
                            {discount > 0 && deliveryPrice > 0 && (
                              <span className="line-through text-muted-foreground text-xs">{deliveryPrice} ₽</span>
                            )}
                            {discountedDelivery === 0 ? "Бесплатно" : `${discountedDelivery} ₽`}
                          </span>
                        </div>
                        <div className="gold-line mb-4" />
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-muted-foreground font-sans uppercase tracking-wider text-sm">Итого</span>
                          <span className="font-serif text-3xl text-primary">{total.toLocaleString()} ₽</span>
                        </div>
                        <button className="w-full candle-glow bg-primary text-primary-foreground py-4 font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm">
                          Оформить заказ
                        </button>
                        <p className="text-muted-foreground text-xs text-center mt-4 font-sans">
                          Самовывоз и заказы от 3 000 ₽ — бесплатно
                        </p>
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-card/30 py-10 px-4 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg text-gold-shimmer">🕯️ Мрачный Детектив</span>
          <p className="text-muted-foreground text-xs font-sans text-center">
            © 2024 Магазин атмосферных детективных игр
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground font-sans">
            <button className="hover-underline hover:text-foreground transition-colors">Доставка</button>
            <button className="hover-underline hover:text-foreground transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}