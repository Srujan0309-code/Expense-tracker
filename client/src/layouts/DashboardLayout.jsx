import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    Promise.resolve().then(() => setMobileOpen(false));
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
      <AnimatedBackground />
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="min-w-0 flex-1">
          <Navbar onMenuClick={() => setMobileOpen(true)} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
