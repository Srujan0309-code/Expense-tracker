import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { animateCounter, hoverScale, resetScale } from "../animations/gsapAnimations";
import formatCurrency from "../utils/formatCurrency";

const iconMap = {
  income: ArrowUpRight,
  expense: ArrowDownRight,
  balance: Wallet,
};

function BalanceCard({ title, amount, tone = "balance", caption, trend }) {
  const amountRef = useRef(null);
  const cardRef = useRef(null);
  const Icon = iconMap[tone] || Wallet;

  useEffect(() => {
    const tween = animateCounter(amountRef.current, Number(amount) || 0, formatCurrency);
    return () => tween.kill();
  }, [amount]);

  const toneClasses = {
    balance: "from-slate-950 via-slate-900 to-teal-900 text-white",
    income: "from-emerald-500 via-teal-500 to-cyan-500 text-white",
    expense: "from-rose-500 via-pink-500 to-orange-400 text-white",
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => hoverScale(cardRef.current, 1.025)}
      onMouseLeave={() => resetScale(cardRef.current)}
      className={`balance-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${toneClasses[tone]} p-6 shadow-2xl shadow-slate-900/10`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/45" />
      <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/75">{title}</p>
          <h2 ref={amountRef} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {formatCurrency(amount)}
          </h2>
        </div>
        <div className="rounded-2xl bg-white/16 p-3 ring-1 ring-white/20">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="relative mt-8 flex items-center justify-between text-sm text-white/78">
        <span>{caption}</span>
        <span className="rounded-full bg-white/14 px-3 py-1 font-semibold ring-1 ring-white/15">
          {trend}
        </span>
      </div>
    </article>
  );
}

export default BalanceCard;
