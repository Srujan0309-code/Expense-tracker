import { useEffect, useRef, useState } from "react";
import { Download, Plus } from "lucide-react";
import API from "../api/axios";
import TransactionCard from "../components/TransactionCard";
import TransactionForm from "../components/TransactionForm";
import { fadeInPage, staggerCards } from "../animations/gsapAnimations";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const pageRef = useRef(null);

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

  useEffect(() => {
    Promise.resolve().then(fetchTransactions);
  }, []);

  useEffect(() => {
    const pageTween = fadeInPage(pageRef.current);
    const transactionTween = staggerCards(".transaction-card", 0.2);

    return () => {
      pageTween.kill();
      transactionTween.kill();
    };
  }, [transactions.length]);

  const addTransaction = (transaction) => {
    setTransactions((current) => [{ ...transaction, _id: transaction._id || crypto.randomUUID() }, ...current]);
  };

  return (
    <div ref={pageRef} className="mx-auto max-w-6xl">
      <section className="rounded-3xl border border-white/70 bg-white/72 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Activity</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Transactions</h1>
            <p className="mt-2 text-sm text-slate-500">Manage income, expenses, categories, and recent money movement.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200/70 transition hover:text-teal-700"
              aria-label="Download report"
              title="Download report"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:bg-teal-700"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        <div className="mt-7 space-y-3">
          {transactions.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-8 text-center">
              <p className="text-sm font-bold text-slate-900">No transactions yet</p>
              <p className="mt-2 text-sm text-slate-500">Add your first income or expense to populate this page.</p>
            </div>
          )}

          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} fetchTransactions={fetchTransactions} />
          ))}
        </div>
      </section>

      {modalOpen && (
        <TransactionForm
          onClose={() => setModalOpen(false)}
          onAdd={addTransaction}
          fetchTransactions={fetchTransactions}
        />
      )}
    </div>
  );
}

export default Transactions;
