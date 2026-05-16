import AnimatedBackground from "./AnimatedBackground";

function Loader() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50">
      <AnimatedBackground />
      <div className="glass-panel flex items-center gap-4 rounded-3xl px-6 py-5">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Preparing workspace</p>
          <p className="text-xs text-slate-500">Syncing your financial overview</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
