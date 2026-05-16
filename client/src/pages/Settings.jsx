import { useEffect, useRef, useState } from "react";
import { Bell, Lock, Palette, ShieldCheck } from "lucide-react";
import { fadeInPage, staggerCards } from "../animations/gsapAnimations";

const settings = [
  {
    title: "Smart alerts",
    text: "Notify me for large spends and unusual activity.",
    icon: Bell,
    enabled: true,
  },
  {
    title: "Privacy mode",
    text: "Mask sensitive amounts during screen sharing.",
    icon: Lock,
    enabled: false,
  },
  {
    title: "Soft theme",
    text: "Keep the dashboard in the current premium light theme.",
    icon: Palette,
    enabled: true,
  },
  {
    title: "Secure session",
    text: "Keep cookie-based authentication active for protected pages.",
    icon: ShieldCheck,
    enabled: true,
  },
];

function Settings() {
  const [preferences, setPreferences] = useState(settings);
  const pageRef = useRef(null);

  useEffect(() => {
    const pageTween = fadeInPage(pageRef.current);
    const cardTween = staggerCards(".settings-card", 0.16);

    return () => {
      pageTween.kill();
      cardTween.kill();
    };
  }, []);

  const toggleSetting = (title) => {
    setPreferences((current) =>
      current.map((setting) =>
        setting.title === title ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div ref={pageRef} className="mx-auto max-w-6xl">
      <section className="rounded-3xl border border-white/70 bg-white/72 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Preferences</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Tune the finance workspace for alerts, privacy, security, and appearance.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {preferences.map((setting) => (
          <article key={setting.title} className="settings-card rounded-3xl border border-slate-200/80 bg-white/78 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
                <setting.icon className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={() => toggleSetting(setting.title)}
                className={`relative h-7 w-12 rounded-full transition ${
                  setting.enabled ? "bg-teal-500" : "bg-slate-200"
                }`}
                aria-label={`${setting.title} toggle`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    setting.enabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <h3 className="mt-4 text-sm font-black text-slate-950">{setting.title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{setting.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Settings;
