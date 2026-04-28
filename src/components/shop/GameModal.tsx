import Icon from "@/components/ui/icon";
import type { Game } from "./data";

interface Props {
  game: Game;
  onClose: () => void;
  addToCart: (game: Game) => void;
}

export default function GameModal({ game, onClose, addToCart }: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-card border border-border/60 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-56 overflow-hidden">
          <img src={game.image} alt={game.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm border border-border/60 rounded-sm p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
          <div className="absolute bottom-4 left-6 right-16">
            <span className="text-primary text-xs font-sans uppercase tracking-widest">{game.genre}</span>
            <h2 className="font-serif text-3xl mt-1">{game.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border/40">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Users" size={14} className="text-primary" />
              <span className="text-muted-foreground font-sans">{game.players} игроков</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-muted-foreground font-sans">{game.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="BarChart2" size={14} className="text-primary" />
              <span className="text-muted-foreground font-sans">{game.difficulty}</span>
            </div>
          </div>

          {/* Full description */}
          <div className="mb-6">
            {game.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-foreground/85 text-sm leading-relaxed font-sans mb-4">{para}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((t) => (
              <span key={t} className="text-xs border border-border/40 text-muted-foreground px-3 py-1 rounded-sm font-sans">
                {t}
              </span>
            ))}
          </div>

          {/* Contents */}
          <div className="mb-6 p-4 bg-background/50 border border-border/40 rounded-sm">
            <p className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-3">Состав набора</p>
            <ul className="grid grid-cols-2 gap-1.5">
              {game.contents.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-sans text-foreground/80">
                  <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Price + CTA */}
          <div className="gold-line mb-5" />
          <div className="flex items-center justify-between">
            <span className="font-serif text-4xl text-primary">{game.price.toLocaleString()} ₽</span>
            <button
              onClick={() => { addToCart(game); onClose(); }}
              className="candle-glow bg-primary text-primary-foreground px-8 py-3.5 font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
