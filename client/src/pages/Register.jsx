import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, Sparkles, User } from "lucide-react";
import API from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";
import { fadeInPage, hoverScale, resetScale, staggerCards } from "../animations/gsapAnimations";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const pageTween = fadeInPage(pageRef.current);
    const cardTween = staggerCards(".auth-animate", 0.08);
    return () => {
      pageTween.kill();
      cardTween.kill();
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to create account. Please try again.");
    }
  };

  return (
    <div ref={pageRef} className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-50 px-4 py-10">
      <AnimatedBackground />
      <section className="auth-animate glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-xl shadow-teal-500/20">
          <Sparkles className="h-7 w-7" />
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-600">Create account</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Start tracking beautifully</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">A polished command center for income, expense, and momentum.</p>
        </div>

        <form onSubmit={submitHandler} className="mt-8 space-y-4">
          <label className="auth-animate relative block">
            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="premium-input"
              required
            />
          </label>

          <label className="auth-animate relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              inputMode="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="premium-input"
              required
            />
          </label>

          <label className="auth-animate relative block">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="premium-input"
              required
            />
          </label>

          <button
            ref={buttonRef}
            type="submit"
            onMouseEnter={() => hoverScale(buttonRef.current, 1.02)}
            onMouseLeave={() => resetScale(buttonRef.current)}
            className="auth-animate flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:bg-teal-700"
          >
            Create account <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-black text-slate-950 transition hover:text-teal-700">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}

export default Register;
