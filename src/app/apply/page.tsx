"use client";

import Link from "next/link";
import { CONFIG } from "@/config";
import TopAppBar from "@/components/layout/TopAppBar";
import Footer from "@/components/layout/Footer";

export default function ApplyPricingPage() {
  return (
    <>
      <TopAppBar />
      <main className="min-h-screen flex flex-col justify-center bg-background text-on-surface antialiased pt-[90px] pb-16 relative overflow-hidden">
        {/* Background grids and blurs */}
        <div className="absolute inset-0 z-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 md:px-12">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md text-emerald-400 text-[9px] uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Govt. MSME Registered Organization
            </div>
            <h1 className="text-headline-lg md:text-display-lg text-on-surface mb-1 tracking-tight font-bold font-display">
              Course Plans
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Structured learning tracks built by an MSME registered technology organization. Enroll below to master computer programming, software development, and AI engineering workflows.
            </p>
            {/* Upgrade Banner Link */}
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
              <span className="text-label-caps text-primary">Already a student?</span>
              <Link href="/upgrade" className="text-label-caps text-on-surface hover:text-primary underline font-bold flex items-center gap-1 transition-colors">
                Upgrade Your Plan Here
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch stagger-children max-w-[1280px] mx-auto">
            {/* Lite Tier */}
            <div className="glass-panel rounded-xl p-6 md:p-8 flex flex-col border border-outline-variant/10 relative card-hover hover:border-outline-variant/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold font-display text-on-surface tracking-widest">LITE</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                <span className="text-4xl font-extrabold text-on-surface">₹349</span>
                <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹599</span>
                <span className="text-body-sm text-on-surface-variant">/program</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-8 min-h-[40px]">
                Perfect for exploring AI fundamentals and getting started with our community.
              </p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {[
                  "Weekly live sessions",
                  "Temporary LMS access",
                  "Notes & resources",
                  "Community access",
                  "Participation certificate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 select-none">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CONFIG.registrationGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-outline-variant/30 text-on-surface text-label-caps py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] text-center font-bold tracking-widest"
              >
                GET STARTED
              </a>
            </div>

            {/* Regular Tier — POPULAR */}
            <div className="glass-panel rounded-xl p-6 md:p-8 flex flex-col border-2 border-primary/40 relative card-hover animate-glow-pulse transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-on-primary text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold font-display text-primary tracking-widest">REGULAR</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                <span className="text-4xl font-extrabold text-on-surface">₹749</span>
                <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹1249</span>
                <span className="text-body-sm text-on-surface-variant">/program</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-8 min-h-[40px]">
                Full course experience with real project work and structured mentorship.
              </p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {[
                  "Everything in Lite",
                  "Course completion certificate",
                  "Real project work",
                  "Recorded sessions",
                  "More assignments",
                  "Better mentor support",
                  "Structured workflow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 select-none">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CONFIG.registrationGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-on-primary text-label-caps py-3.5 rounded-lg hover:bg-primary-fixed transition-all active:scale-[0.98] text-center font-bold tracking-widest block shadow-[0_0_20px_rgba(171,199,255,0.2)]"
              >
                APPLY NOW
              </a>
            </div>

            {/* Pro Tier */}
            <div className="glass-panel rounded-xl p-6 md:p-8 flex flex-col border border-outline-variant/10 relative card-hover hover:border-outline-variant/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold font-display text-tertiary tracking-widest">PRO</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                <span className="text-4xl font-extrabold text-on-surface">₹1249</span>
                <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹1599</span>
                <span className="text-body-sm text-on-surface-variant">/program</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-8 min-h-[40px]">
                Premium tier with lifetime access, 1-on-1 mentorship, and career services.
              </p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {[
                  "Everything in Regular",
                  "Lifetime LMS access",
                  "Lifetime recordings",
                  "Advanced content",
                  "Premium projects",
                  "1-on-1 mentorship",
                  "Resume review",
                  "LinkedIn optimization",
                  "Priority support",
                  "Course completion cert",
                  "Recommendation letters",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 select-none">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CONFIG.registrationGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-outline-variant/30 text-on-surface text-label-caps py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] text-center font-bold tracking-widest"
              >
                GO PREMIUM
              </a>
            </div>
          </div>

          {/* Secure Note */}
          <div className="text-center mt-12">
            <p className="text-body-sm text-on-surface-variant flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-success">lock</span>
              Secure Form Registration • Verification within 24-48 hours
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
