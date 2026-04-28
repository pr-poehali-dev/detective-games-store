import { useState } from "react";
import Icon from "@/components/ui/icon";
import { GAMES } from "./data";
import type { Game } from "./data";

interface Props {
  setSelectedGame: (game: Game) => void;
  addToCart: (game: Game) => void;
}

export default function SectionCatalog({ setSelectedGame, addToCart }: Props) {
  const [filterGenre, setFilterGenre] = useState<string>("Все");

  const genres = ["Все", ...Array.from(new Set(GAMES.map((g) => g.genre)))];
  const filteredGames = filterGenre === "Все" ? GAMES : GAMES.filter((g) => g.genre === filterGenre);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-primary/70 text-xs uppercase tracking-widest mb-2 font-sans">Коллекция</p>
        <h2 className="font-serif text-5xl font-light mb-6">Каталог игр</h2>
        <div className="gold-line w-20 mb-8" />
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
            className={`card-glow border border-border/60 rounded-sm overflow-hidden bg-card fade-delay-${Math.min(i + 1, 4)} cursor-pointer group`}
            onClick={() => setSelectedGame(game)}
          >
            <div className="relative overflow-hidden h-52">
              <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-65 group-hover:opacity-85 transition-all duration-500 group-hover:scale-105" />
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
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-background/80 backdrop-blur-sm border border-primary/50 text-primary text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-sm">
                  Подробнее
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
    </div>
  );
}
