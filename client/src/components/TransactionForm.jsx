import { useEffect, useRef, useState } from "react";
import { Calendar, IndianRupee, Tag, Type, X } from "lucide-react";
import API from "../api/axios";
import { hoverScale, modalIn, modalOut, resetScale } from "../animations/gsapAnimations";

const emptyForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "",
  date: new Date().toISOString().slice(0, 10),
};

function TransactionForm({ fetchTransactions, onClose, onAdd }) {
  const [formData, setFormData] = useState(emptyForm);
  const modalRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    const tween = modalIn(modalRef.current);
    return () => tween.kill();
  }, []);

  const closeWithAnimation = () => {
    modalOut(modalRef.current, onClose);
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      category: formData.category || "General",
    };

    try {
      const { data } = await API.post("/transactions", transaction);
      onAdd?.(data?.transaction || data || transaction);
      fetchTransactions?.();
      setFormData(emptyForm);
      closeWithAnimation();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to save transaction. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-md">
      <form
        ref={modalRef}
        onSubmit={submitHandler}
        className="w-full max-w-xl rounded-3xl border border-white/65 bg-white/86 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">New movement</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Add transaction</h2>
          </div>
          <button
            type="button"
            onClick={closeWithAnimation}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            aria-label="Close modal"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="relative sm:col-span-2">
            <Type className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="title"
              placeholder="Transaction title"
              value={formData.title}
              onChange={changeHandler}
              className="premium-input"
              required
            />
          </label>

          <label className="relative">
            <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              inputMode="numeric"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={changeHandler}
              className="premium-input"
              min="1"
              required
            />
          </label>

          <label className="relative">
            <Tag className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={changeHandler}
              className="premium-input"
            />
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={changeHandler}
            className="rounded-[1.25rem] border border-slate-200/80 bg-white/72 px-4 py-4 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <label className="relative">
            <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={changeHandler}
              className="premium-input"
            />
          </label>
        </div>

        <button
          ref={submitRef}
          type="submit"
          onMouseEnter={() => hoverScale(submitRef.current, 1.02)}
          onMouseLeave={() => resetScale(submitRef.current)}
          className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:bg-teal-700"
        >
          Save transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
