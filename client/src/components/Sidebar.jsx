import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ChartNoAxesCombined, CreditCard, LayoutDashboard, Settings, WalletCards, X } from "lucide-react";
import { slideSidebar } from "../animations/gsapAnimations";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/" },
  { label: "Transactions", icon: CreditCard, to: "/transactions" },
  { label: "Analytics", icon: ChartNoAxesCombined, to: "/analytics" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

function Sidebar({ mobileOpen = false, onClose }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const tween = slideSidebar(sidebarRef.current);
    return () => tween.kill();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/12 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/30 transition-transform duration-300 lg:sticky lg:top-0 lg:z-40 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 shadow-lg shadow-teal-500/20">
              <WalletCards className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">ExpTrackr</p>
              <p className="text-xs text-white/48">Finance OS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-white/70 lg:hidden"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-xl shadow-white/10"
                    : "text-white/62 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 rounded-3xl bg-white/[0.07] p-4 ring-1 ring-white/10">
          <p className="text-sm font-bold">Savings target</p>
          <p className="mt-1 text-xs leading-5 text-white/50">You are 72% toward this month&apos;s reserve goal.</p>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-teal-300 to-indigo-400" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
