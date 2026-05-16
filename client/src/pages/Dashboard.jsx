import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import API from "../api/axios";
import BalanceCard from "../components/BalanceCard";
import { fadeInPage, revealOnScroll, staggerCards } from "../animations/gsapAnimations";
import formatCurrency from "../utils/formatCurrency";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const pageRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await API.get("/transactions");
        const nextTransactions = data.transactions || data || [];
        if (Array.isArray(nextTransactions)) {
          setTransactions(nextTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    Promise.resolve().then(fetchTransactions);
  }, []);

  useEffect(() => {
    const pageTween = fadeInPage(pageRef.current);
    const cardTween = staggerCards(".dashboard-card", 0.15);
    const scrollTweens = revealOnScroll(".reveal-section");

    return () => {
      pageTween.kill();
      cardTween.kill();
      scrollTweens.forEach((tween) => tween.kill());
    };
  }, [transactions.length]);

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount) || 0;
        if (transaction.type === "income") acc.income += amount;
        else acc.expense += amount;
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const categoryTotals = useMemo(() => {
    const totalsByCategory = transactions.reduce((acc, transaction) => {
      const category = transaction.category || "General";
      acc[category] = (acc[category] || 0) + Number(transaction.amount || 0);
      return acc;
    }, {});

    return Object.entries(totalsByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [transactions]);

  return (
    <div ref={pageRef} className="mx-auto max-w-7xl">
      <section className="dashboard-card dark-glass relative overflow-hidden rounded-3xl p-6 text-white sm:p-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-100 ring-1 ring-white/12">
              <Sparkles className="h-3.5 w-3.5" />
              Premium money overview
            </div>
            <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Track spend, protect cashflow, and move with clarity.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
              A clean command center for balances, cashflow health, and daily finance decisions.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/12">
            <p className="text-sm text-white/58">Projected monthly close</p>
            <p className="mt-2 text-3xl font-black">{formatCurrency(totals.balance + 42000)}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-teal-200">
              <ArrowUpRight className="h-4 w-4" />
              14.8% healthier than last month
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <BalanceCard title="Total balance" amount={totals.balance} tone="balance" caption="Available liquidity" trend="+12.4%" />
        <BalanceCard title="Income" amount={totals.income} tone="income" caption="This month" trend="+8.2%" />
        <BalanceCard title="Expenses" amount={totals.expense} tone="expense" caption="This month" trend="-3.1%" />
      </section>

      <section className="reveal-section mt-6 grid gap-4 md:grid-cols-3">
        {(categoryTotals.length ? categoryTotals : [["No data yet", 0]]).map(([category, amount], index) => (
          <article key={category} className="rounded-3xl border border-white/70 bg-white/66 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
            <p className="text-sm font-bold text-slate-500">{category}</p>
            <p className="mt-3 text-2xl font-black text-slate-950">{formatCurrency(amount)}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"
                style={{ width: `${categoryTotals.length ? Math.max(20, 76 - index * 18) : 12}%` }}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;
