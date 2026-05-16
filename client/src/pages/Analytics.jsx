import { useEffect, useRef } from "react";
import StatsChart from "../components/StatsChart";
import { fadeInPage, staggerCards } from "../animations/gsapAnimations";
import formatCurrency from "../utils/formatCurrency";

const insights = [
  ["Monthly burn", 58000, "Down 3.1% from last month"],
  ["Savings velocity", 112000, "Strong inflow trend"],
  ["Recurring costs", 18400, "Subscriptions and fixed bills"],
];

function Analytics() {
  const pageRef = useRef(null);

  useEffect(() => {
    const pageTween = fadeInPage(pageRef.current);
    const cardTween = staggerCards(".analytics-card", 0.16);

    return () => {
      pageTween.kill();
      cardTween.kill();
    };
  }, []);

  return (
    <div ref={pageRef} className="mx-auto max-w-7xl">
      <section className="mb-6 rounded-3xl border border-white/70 bg-white/72 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Analytics</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Cashflow intelligence</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Understand weekly performance, recurring pressure, and the categories shaping your money.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {insights.map(([title, amount, note]) => (
          <article key={title} className="analytics-card rounded-3xl border border-white/70 bg-white/72 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{formatCurrency(amount)}</p>
            <p className="mt-3 text-sm text-slate-500">{note}</p>
          </article>
        ))}
      </section>

      <div className="mt-6">
        <StatsChart />
      </div>
    </div>
  );
}

export default Analytics;
