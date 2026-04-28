import Icon from "@/components/ui/icon";
import { ABOUT_ITEMS } from "./data";
import type { Section } from "./data";

interface Props {
  nav: (s: Section) => void;
}

export default function SectionAbout({ nav }: Props) {
  return (
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
  );
}
