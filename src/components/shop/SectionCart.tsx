import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DELIVERY_OPTIONS, PROMO_CODES } from "./data";
import type { CartItem, Section, DeliveryId } from "./data";

interface Props {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  cartTotal: number;
  nav: (s: Section) => void;
}

export default function SectionCart({ cart, removeFromCart, cartTotal, nav }: Props) {
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "ok" | "error">("idle");
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState<DeliveryId>("courier");

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

  return (
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
  );
}
