import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInPage = (target) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
  );
};

export const revealNavbar = (target) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: -22 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
  );
};

export const slideSidebar = (target) => {
  return gsap.fromTo(
    target,
    { opacity: 0, x: -36 },
    { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
  );
};

export const staggerCards = (targets, delay = 0) => {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 28, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      delay,
      stagger: 0.1,
      ease: "power3.out",
    }
  );
};

export const animateCounter = (target, value, formatter) => {
  const counter = { value: 0 };

  return gsap.to(counter, {
    value,
    duration: 1.25,
    ease: "power3.out",
    onUpdate: () => {
      if (target) {
        target.textContent = formatter(counter.value);
      }
    },
  });
};

export const modalIn = (target) => {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
  );
};

export const modalOut = (target, onComplete) => {
  return gsap.to(target, {
    opacity: 0,
    y: 24,
    scale: 0.96,
    duration: 0.25,
    ease: "power2.in",
    onComplete,
  });
};

export const hoverScale = (target, scale = 1.03) => {
  gsap.to(target, { scale, duration: 0.25, ease: "power2.out" });
};

export const resetScale = (target) => {
  gsap.to(target, { scale: 1, duration: 0.25, ease: "power2.out" });
};

export const revealOnScroll = (targets) => {
  return gsap.utils.toArray(targets).map((target) =>
    gsap.fromTo(
      target,
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: target,
          start: "top 86%",
          once: true,
        },
      }
    )
  );
};

export default gsap;
