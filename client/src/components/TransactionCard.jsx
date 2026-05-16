import { useRef } from "react";
import { Coffee, MoreHorizontal, ShoppingBag, Trash2, TrendingUp, WalletCards } from "lucide-react";
import API from "../api/axios";
import { hoverScale, resetScale } from "../animations/gsapAnimations";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";

const categoryIcons = {
  food: Coffee,
  shopping: ShoppingBag,
  salary: TrendingUp,
  freelance: WalletCards,
};

function TransactionCard({ transaction, fetchTransactions }) {
  const cardRef = useRef(null);
  const type = transaction.type || "expense";
  const amount = Number(transaction.amount) || 0;
  const category = transaction.category || "General";
  const Icon = categoryIcons[category.toLowerCase()] || WalletCards;

  const deleteHandler = async () => {
    if (!transaction._id) return fetchTransactions?.();

    try {
      await API.delete(`/transactions/${transaction._id}`);
      fetchTransactions?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => hoverScale(cardRef.current, 1.012)}
      onMouseLeave={() => resetScale(cardRef.current)}
      className="transaction-card group flex items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/76 p-4 shadow-sm shadow-slate-900/5 backdrop-blur-xl transition hover:border-teal-200/80 hover:shadow-xl hover:shadow-slate-900/8"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
            type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-slate-950 sm:text-base">
            {transaction.title || "Untitled transaction"}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
              {category}
            </span>
            <span>{formatDate(transaction.date || transaction.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <p className={`text-sm font-black sm:text-base ${type === "income" ? "text-emerald-600" : "text-slate-950"}`}>
          {type === "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </p>
        <button
          type="button"
          onClick={deleteHandler}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
          aria-label="Delete transaction"
          title="Delete transaction"
        >
          {transaction._id ? <Trash2 className="h-4 w-4" /> : <MoreHorizontal className="h-4 w-4" />}
        </button>
      </div>
    </article>
  );
}

export default TransactionCard;
