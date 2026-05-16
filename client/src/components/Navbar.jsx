import { useEffect, useRef } from "react";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { hoverScale, resetScale, revealNavbar } from "../animations/gsapAnimations";

function Navbar({ onMenuClick }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const logoutRef = useRef(null);

  useEffect(() => {
    const tween = revealNavbar(navRef.current);
    return () => tween.kill();
  }, []);

  const logoutHandler = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const initials = (user?.name || "A")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header ref={navRef} className="sticky top-0 z-30 border-b border-white/60 bg-white/58 px-4 py-4 backdrop-blur-2xl lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/70 lg:hidden"
            aria-label="Open sidebar"
            title="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Expense tracker</p>
            <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Financial cockpit</h1>
          </div>
        </div>

        <div className="hidden min-w-[18rem] max-w-md flex-1 items-center rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="ml-3 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search transactions, categories..."
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200/70 transition hover:text-teal-600"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-2 py-2 shadow-sm ring-1 ring-slate-200/70">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-slate-950 to-teal-700 text-sm font-black text-white">
              {initials}
            </div>
            <div className="hidden pr-1 sm:block">
              <p className="text-sm font-bold text-slate-950">{user?.name || "Aarav Sharma"}</p>
              <p className="text-xs text-slate-500">Premium plan</p>
            </div>
          </div>
          <button
            ref={logoutRef}
            type="button"
            onClick={logoutHandler}
            onMouseEnter={() => hoverScale(logoutRef.current, 1.05)}
            onMouseLeave={() => resetScale(logoutRef.current)}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20 transition hover:bg-teal-700"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
