"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopAppBar from "@/components/layout/TopAppBar";
import Footer from "@/components/layout/Footer";

interface StudentAccount {
  id: string;
  name: string;
  email: string;
  track: string;
  tier: "Lite" | "Regular" | "Pro";
  registeredAt: string;
  password?: string;
}

export default function AdminRegisterStudentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [track, setTrack] = useState("ai-ml");
  const [tier, setTier] = useState<"Lite" | "Regular" | "Pro">("Regular");
  const [accounts, setAccounts] = useState<StudentAccount[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Load registered accounts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("neurospire_provisioned_students");
    if (saved) {
      try {
        setAccounts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse provisioned student accounts", e);
      }
    } else {
      // Seed default admin manual accounts
      const defaultAccounts: StudentAccount[] = [
        {
          id: "STU-9801",
          name: "Amit Sharma",
          email: "amit.sharma@example.com",
          track: "AI / Machine Learning",
          tier: "Regular",
          registeredAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          password: "student123",
        },
        {
          id: "STU-7762",
          name: "Sneha Patel",
          email: "sneha.patel@example.com",
          track: "Prompt Engineering",
          tier: "Lite",
          registeredAt: new Date(Date.now() - 86400000).toLocaleDateString(),
          password: "student123",
        },
      ];
      setAccounts(defaultAccounts);
      localStorage.setItem("neurospire_provisioned_students", JSON.stringify(defaultAccounts));
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) return;

    const newAccount: StudentAccount = {
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      track:
        track === "ai-ml"
          ? "AI / Machine Learning"
          : track === "web-dev"
          ? "Web Development"
          : track === "data-science"
          ? "Data Science"
          : track === "python"
          ? "Python Development"
          : "Prompt Engineering",
      tier,
      registeredAt: new Date().toLocaleDateString(),
      password,
    };

    const updated = [newAccount, ...accounts];
    setAccounts(updated);
    localStorage.setItem("neurospire_provisioned_students", JSON.stringify(updated));

    // Clear form
    setName("");
    setEmail("");
    setPassword("");
    setSuccessMessage(`Account for ${name} successfully provisioned!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const deleteAccount = (id: string) => {
    const updated = accounts.filter((acc) => acc.id !== id);
    setAccounts(updated);
    localStorage.setItem("neurospire_provisioned_students", JSON.stringify(updated));
  };

  return (
    <>
      <TopAppBar />
      <main className="min-h-screen flex flex-col justify-center bg-background text-on-surface antialiased pt-[90px] pb-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 md:px-12">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-4">
              <span className="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
              <span className="text-label-caps text-primary">Neurospire Portal Administrator</span>
            </div>
            <h1 className="text-headline-lg md:text-display-lg text-on-surface mb-3 tracking-tight font-bold">
              Register New Students
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Manually provision secure student accounts after receiving form registration and UPI payment validation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1200px] mx-auto items-start">
            {/* Registration Form (Left Column) */}
            <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl">
              <h2 className="text-title-lg font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person_add</span>
                Account Provisioning
              </h2>

              {successMessage && (
                <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg flex items-center gap-3 text-success animate-scale-in text-body-sm">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="reg-name">
                    Student Full Name
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Amit Sharma"
                    className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="reg-email">
                    Student Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g. amit@example.com"
                    className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                {/* Temp Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="reg-pass">
                    Temporary Password
                  </label>
                  <input
                    id="reg-pass"
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure initial password"
                    className="w-full bg-surface-container-low/40 border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                  />
                </div>

                {/* Track Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="reg-track">
                    Selected Course Track
                  </label>
                  <select
                    id="reg-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-all"
                  >
                    <option value="ai-ml">AI / Machine Learning</option>
                    <option value="web-dev">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="python">Python Development</option>
                    <option value="prompt-eng">Prompt Engineering</option>
                  </select>
                </div>

                {/* Tier Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]">
                    LMS Access Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Lite", "Regular", "Pro"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTier(t as any)}
                        className={`py-2 rounded-lg text-label-caps border font-bold transition-all ${
                          tier === t
                            ? "bg-primary border-primary text-on-primary shadow-lg"
                            : "bg-surface-container-low/20 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-fixed text-on-primary text-label-caps py-3.5 rounded-lg font-bold tracking-widest transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  PROVISION ACCOUNT
                </button>
              </form>
            </div>

            {/* Registered Students Directory (Right Column) */}
            <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">groups</span>
                  Registered Student Directory
                </h2>
                <span className="text-body-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-bold">
                  {accounts.length} Students
                </span>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
                {accounts.length === 0 ? (
                  <p className="text-center py-8 text-body-sm text-on-surface-variant">No manually registered students found.</p>
                ) : (
                  accounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="glass-panel p-4 rounded-lg border border-outline-variant/10 flex items-center justify-between gap-4 card-hover"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-body-lg font-bold text-on-surface">{acc.name}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            acc.tier === "Pro"
                              ? "bg-tertiary/10 text-tertiary border border-tertiary/20"
                              : acc.tier === "Regular"
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-outline-variant/10 text-outline-variant border border-outline-variant/20"
                          }`}>
                            {acc.tier}
                          </span>
                        </div>
                        <span className="text-body-sm text-on-surface-variant font-mono">{acc.email}</span>
                        <span className="text-[12px] text-outline flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">psychology</span>
                          {acc.track} • Registered {acc.registeredAt}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteAccount(acc.id)}
                        className="text-on-surface-variant hover:text-error p-2 hover:bg-surface-container rounded-lg transition-colors"
                        title="Delete Student account"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Quick instructions */}
              <div className="mt-6 border-t border-outline-variant/10 pt-4 text-[12px] text-outline flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">help</span>
                <p>
                  These accounts are kept in safe client storage (localStorage) for demonstration. In a live production system, hitting Provision registers the user securely in your Supabase Auth Database, so they can directly use `/login`!
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
