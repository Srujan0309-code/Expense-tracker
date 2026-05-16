import { useEffect, useRef } from "react";
import gsap from "../animations/gsapAnimations";

function AnimatedBackground({ dark = false }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ambient-layer", {
        x: "random(-28, 28)",
        y: "random(-22, 22)",
        scale: "random(0.96, 1.08)",
        duration: "random(6, 9)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35,
      });

      gsap.to(".particle", {
        y: "random(-18, 18)",
        opacity: "random(0.25, 0.55)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.12,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const base = dark ? "opacity-60" : "opacity-75";

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`ambient-layer absolute -left-24 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.34),rgba(20,184,166,0)_67%)] blur-2xl ${base}`}
      />
      <div
        className={`ambient-layer absolute right-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.28),rgba(99,102,241,0)_66%)] blur-2xl ${base}`}
      />
      <div
        className={`ambient-layer absolute bottom-[-16rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.2),rgba(244,114,182,0)_65%)] blur-2xl ${base}`}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="particle absolute h-1 w-1 rounded-full bg-slate-500/30"
          style={{
            left: `${8 + ((index * 17) % 86)}%`,
            top: `${10 + ((index * 23) % 78)}%`,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedBackground;
