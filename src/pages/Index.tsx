import { useState } from "react";
import Icon from "@/components/ui/icon";
import { GAMES, QUIZ_QUESTIONS } from "@/components/shop/data";
import type { Game, CartItem, Section } from "@/components/shop/data";
import SectionHome from "@/components/shop/SectionHome";
import SectionCatalog from "@/components/shop/SectionCatalog";
import SectionAbout from "@/components/shop/SectionAbout";
import SectionCart from "@/components/shop/SectionCart";
import GameModal from "@/components/shop/GameModal";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const addToCart = (game: Game) => {
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

  const recommendedGames = quizDone ? GAMES.slice(0, 2) : [];

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
        {activeSection === "home" && (
          <SectionHome
            nav={nav}
            addToCart={addToCart}
            setSelectedGame={setSelectedGame}
            quizStep={quizStep}
            quizDone={quizDone}
            recommendedGames={recommendedGames}
            onQuizAnswer={handleQuizAnswer}
            onResetQuiz={resetQuiz}
          />
        )}

        {activeSection === "catalog" && (
          <SectionCatalog
            setSelectedGame={setSelectedGame}
            addToCart={addToCart}
          />
        )}

        {activeSection === "about" && (
          <SectionAbout nav={nav} />
        )}

        {activeSection === "cart" && (
          <SectionCart
            cart={cart}
            removeFromCart={removeFromCart}
            cartTotal={cartTotal}
            nav={nav}
          />
        )}
      </main>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          addToCart={addToCart}
        />
      )}

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
