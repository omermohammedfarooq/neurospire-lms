"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface StudentAccount {
  id: string;
  name: string;
  email: string;
  track: string;
  tier: "Lite" | "Regular" | "Pro";
  password?: string;
}

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // Seed default registered students if localStorage is empty
  useEffect(() => {
    const saved = localStorage.getItem("neurospire_provisioned_students");
    if (!saved) {
      const defaultAccounts = [
        {
          id: "STU-9801",
          name: "Amit Sharma",
          email: "amit.sharma@example.com",
          track: "AI / Machine Learning",
          tier: "Regular",
          password: "student123",
        },
        {
          id: "STU-7762",
          name: "Sneha Patel",
          email: "sneha.patel@example.com",
          track: "Prompt Engineering",
          tier: "Lite",
          password: "student123",
        },
      ];
      localStorage.setItem("neurospire_provisioned_students", JSON.stringify(defaultAccounts));
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Student validation
    const savedStr = localStorage.getItem("neurospire_provisioned_students");
    let students: StudentAccount[] = [];
    if (savedStr) {
      try {
        students = JSON.parse(savedStr);
      } catch (e) {
        console.error(e);
      }
    }

    const matched = students.find((s) => s.email.toLowerCase() === email.toLowerCase().trim());

    if (matched) {
      const expectedPassword = matched.password || "student123";
      if (password === expectedPassword) {
        sessionStorage.setItem("neurospire_student_session", JSON.stringify(matched));
        router.push("/portal");
      } else {
        setErrorMessage("Incorrect Password. Please check the administrative dashboard to verify student credentials.");
      }
    } else {
      setErrorMessage(`Email "${email}" is not registered. Please register first on the Onboarding/Pricing page, then provision the account in the Admin console.`);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 grid-overlay opacity-50 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] px-4 md:px-0 animate-scale-in">
        <div className="bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Link href="/">
                <BrandLogo size={36} />
              </Link>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-display">
              Student Portal Login
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Access your project environment, LMS, and certificates.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg flex items-start gap-2.5 text-error text-[12px] leading-relaxed animate-fade-in">
              <span className="material-symbols-outlined shrink-0 text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="email-field">
                Student Registered Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                </div>
                <input
                  className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg py-2.5 pl-10 pr-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/50 text-body-sm"
                  id="email-field"
                  placeholder="E.g. amit.sharma@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="password-field">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                </div>
                <input
                  className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg py-2.5 pl-10 pr-10 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/50 font-mono text-body-sm"
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
              className="w-full bg-primary hover:bg-primary-fixed text-on-primary text-label-caps py-3 rounded-lg font-bold tracking-widest transition-all duration-200 shadow-[0_0_15px_rgba(68,143,255,0.15)] active:scale-[0.98] flex justify-center items-center gap-2 mt-4"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              AUTHENTICATE
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center border-t border-outline-variant/10 pt-4">
            <p className="text-[11px] text-outline-variant flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">encrypted</span>
              Secure connection verified
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1.5 font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
