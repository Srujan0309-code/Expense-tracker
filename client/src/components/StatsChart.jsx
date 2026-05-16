import { useEffect, useRef } from "react";
import gsap from "../animations/gsapAnimations";

const chartData = [
  { label: "Mon", income: 72, expense: 48 },
  { label: "Tue", income: 58, expense: 62 },
  { label: "Wed", income: 86, expense: 42 },
  { label: "Thu", income: 64, expense: 54 },
  { label: "Fri", income: 92, expense: 66 },
  { label: "Sat", income: 76, expense: 38 },
  { label: "Sun", income: 88, expense: 44 },
];

function StatsChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chart-bar",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: 0.9, stagger: 0.05, ease: "power3.out" }
      );
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={chartRef} className="reveal-section rounded-3xl border border-white/70 bg-white/72 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Cashflow</p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">Weekly performance</h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-teal-500" />Income</span>
          <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-rose-400" />Expense</span>
        </div>
      </div>

      <div className="mt-8 flex h-64 items-end justify-between gap-3 sm:gap-5">
        {chartData.map((item) => (
          <div key={item.label} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
            <div className="flex h-full w-full items-end justify-center gap-1.5 sm:gap-2">
              <div
                className="chart-bar w-full max-w-5 rounded-t-full bg-gradient-to-t from-teal-600 to-cyan-300 shadow-lg shadow-teal-500/15"
                style={{ height: `${item.income}%` }}
              />
              <div
                className="chart-bar w-full max-w-5 rounded-t-full bg-gradient-to-t from-rose-500 to-orange-300 shadow-lg shadow-rose-500/15"
                style={{ height: `${item.expense}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsChart;
