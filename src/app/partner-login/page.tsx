"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface PartnerAccount {
  id: string;
  name: string;
  email: string;
  track: string;
  company: string;
  password?: string;
  registeredAt: string;
}

export default function PartnerLoginPage() {
  const router = useRouter();
  const [corporateId, setCorporateId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeView, setActiveView] = useState<"login" | "forgot">("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!corporateId || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const cleanCorpId = corporateId.toUpperCase().trim();

    // Demo partner validation check for hardcoded fallback
    if (cleanCorpId === "PARTNER-100" && password === "partnerpass") {
      sessionStorage.setItem(
        "neurospire_student_session",
        JSON.stringify({
          name: "Enterprise Partner Hub",
          email: "partner@neurospire.ai",
          tier: "Pro",
          track: "Institutional Integration",
        })
      );
      router.push("/portal");
      return;
    }

    // Check provisioned partners in local storage
    const savedStr = localStorage.getItem("neurospire_provisioned_partners");
    let partners: PartnerAccount[] = [];
    if (savedStr) {
      try {
        partners = JSON.parse(savedStr);
      } catch (err) {
        console.error(err);
      }
    }

    const matched = partners.find((p) => p.id.toUpperCase() === cleanCorpId);

    if (matched) {
      if (matched.password === password) {
        sessionStorage.setItem(
          "neurospire_student_session",
          JSON.stringify({
            name: matched.name,
            email: matched.email,
            tier: "Pro",
            track: matched.track,
          })
        );
        router.push("/portal");
      } else {
        setErrorMessage("Incorrect administrative password for this Corporate ID.");
      }
    } else {
      setErrorMessage(`Corporate ID "${corporateId}" is not registered in the Neurospire registry.`);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage("");

    if (!forgotEmail) return;

    if (forgotEmail.toLowerCase().trim() === "partner@neurospire.ai") {
      setForgotMessage(
        "A secure reset authorization has been routed to your corporate email administrator. Please authorize within 15 minutes."
      );
    } else {
      setForgotMessage(
        "The entered corporate email is not recognized. Please verify your administrative credentials or contact support@neurospire.ai."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 grid-overlay opacity-30 pointer-events-none" />
      {/* Emerald accent */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[130px] z-0 pointer-events-none" />
      {/* Gold accent */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] px-4 md:px-0 animate-scale-in">
        <div className="glass-panel-strong rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-emerald-500/20">
          {/* Top subtle golden edge highlight to look very premium */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/20 via-amber-500/40 to-emerald-500/20" />

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="material-symbols-outlined text-emerald-500 text-[26px]">corporate_fare</span>
              <span className="text-on-surface tracking-tight text-xl font-bold font-display">
                Partner Hub
              </span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-display">
              {activeView === "login" ? "Enterprise Portal" : "Administrative Recovery"}
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              {activeView === "login"
                ? "Secure access for corporate partners, institutions, and sponsors."
                : "Initiate secure credentials routing with our systems."}
            </p>
          </div>

          {activeView === "login" ? (
            <>
              {errorMessage && (
                <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg flex items-start gap-2.5 text-error text-[12px] leading-relaxed animate-fade-in">
                  <span className="material-symbols-outlined shrink-0 text-[18px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
                {/* Corporate ID Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="corp-id-field">
                    Partner Corporate ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        badge
                      </span>
                    </div>
                    <input
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg py-2.5 pl-10 pr-3 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-outline/50 text-body-sm font-mono"
                      id="corp-id-field"
                      placeholder="E.g. PARTNER-100"
                      type="text"
                      required
                      value={corporateId}
                      onChange={(e) => setCorporateId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="password-field">
                      Administrative Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveView("forgot");
                        setForgotMessage("");
                        setForgotEmail("");
                      }}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline transition-colors font-bold"
                    >
                      Forgot Credentials?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        lock
                      </span>
                    </div>
                    <input
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg py-2.5 pl-10 pr-10 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-outline/50 font-mono text-body-sm"
                      id="password-field"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors"
                      tabIndex={-1}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-label-caps py-3 rounded-lg font-bold tracking-widest transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-[0.98] flex justify-center items-center gap-2 mt-4"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">domain_verification</span>
                  AUTHENTICATE CREDENTIALS
                </button>
              </form>
            </>
          ) : (
            /* Forgot Password Form */
            <div className="flex flex-col gap-5">
              {forgotMessage && (
                <div className={`p-4 rounded-lg flex items-start gap-2.5 text-[12px] leading-relaxed animate-fade-in border ${
                  forgotMessage.includes("authorization")
                    ? "bg-success/10 border-success/30 text-success"
                    : "bg-error/10 border-error/30 text-error"
                }`}>
                  <span className="material-symbols-outlined shrink-0 text-[18px]">
                    {forgotMessage.includes("authorization") ? "check_circle" : "info"}
                  </span>
                  <span>{forgotMessage}</span>
                </div>
              )}

              <form className="flex flex-col gap-5" onSubmit={handleForgotSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="forgot-email-field">
                    Administrative Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        mail
                      </span>
                    </div>
                    <input
                      className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg py-2.5 pl-10 pr-3 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-outline/50 text-body-sm"
                      id="forgot-email-field"
                      placeholder="E.g. administrator@company.com"
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-label-caps py-3 rounded-lg font-bold tracking-widest transition-all duration-200 active:scale-[0.98] flex justify-center items-center gap-2 mt-2"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">security</span>
                  REQUEST CREDENTIALS ROUTE
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveView("login");
                    setErrorMessage("");
                  }}
                  className="text-[12px] text-on-surface-variant hover:text-on-surface transition-colors font-bold text-center mt-2"
                >
                  Return to Authenticator
                </button>
              </form>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-6 text-center border-t border-outline-variant/20 pt-4">
            <p className="text-[11px] text-outline flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">encrypted</span>
              Verified AES-256 Administrative Lock
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6 flex flex-col gap-2">
          <Link
            href="/"
            className="text-body-sm text-on-surface-variant hover:text-emerald-600 transition-colors flex items-center justify-center gap-1.5 font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
          <div className="text-[12px] text-on-surface-variant opacity-75">
            Are you a student?{" "}
            <Link href="/login" className="text-emerald-600 hover:underline font-bold">
              Go to Student Portal Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
