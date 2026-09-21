"use client";

import Link from "next/link";
import { CONFIG } from "@/config";
import TopAppBar from "@/components/layout/TopAppBar";
import Footer from "@/components/layout/Footer";

export default function UpgradePlanPage() {
  return (
    <>
      <TopAppBar />
      <main className="min-h-screen flex flex-col justify-center bg-background text-on-surface antialiased pt-[90px] pb-16 relative overflow-hidden">
        {/* Background grids and blurs */}
        <div className="absolute inset-0 z-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 md:px-12">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-label-caps text-primary">Maximize Your Potential</span>
            </div>
            <h1 className="text-headline-lg md:text-display-lg text-on-surface mb-3 tracking-tight font-bold">
              Upgrade Your Plan
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Accelerate your training by moving up a tier. Transition to robust project immersion, verified certifications, and elite mentorship.
            </p>
          </div>

          {/* Upgrade Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto stagger-children">
            
            {/* Lite to Regular Card */}
            <div className="glass-panel rounded-xl p-8 flex flex-col border border-outline-variant/10 card-hover transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="text-label-caps text-primary tracking-widest font-bold mb-2">TIER UPGRADE</span>
              <h2 className="text-title-lg font-bold text-on-surface mb-1 flex items-center gap-2">
                Lite 
                <span className="material-symbols-outlined text-[20px] text-primary">arrow_forward</span>
                Regular
              </h2>
              <div className="flex items-baseline gap-1 mt-4 mb-6">
                <span className="text-5xl font-extrabold text-on-surface">₹400</span>
                <span className="text-body-sm text-on-surface-variant">one-time difference</span>
              </div>
              
              <p className="text-body-sm text-on-surface-variant mb-6 flex-grow">
                Transition from a fundamental introduction to a fully verified course completion. Unlock everything required for institutional recognition and career advancement.
              </p>

              <div className="border-t border-outline-variant/10 pt-6 mb-8">
                <h4 className="text-label-caps text-on-surface font-bold mb-4">WHAT YOU UNLOCK:</h4>
                <ul className="flex flex-col gap-3">
                  {[
                    "Official Course Completion Certificate",
                    "Assigned real-world projects & repo reviews",
                    "Extended LMS access with recorded sessions",
                    "Full weekly assignments and grading telemetry",
                    "Active mentor Q&A and community assistance",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">add_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={CONFIG.upgradeGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-on-primary text-label-caps py-4 rounded-lg hover:bg-primary-fixed transition-all active:scale-[0.98] text-center font-bold tracking-widest block shadow-[0_0_20px_rgba(171,199,255,0.1)] group-hover:shadow-[0_0_30px_rgba(171,199,255,0.2)]"
              >
                UPGRADE TO REGULAR
              </a>
            </div>

            {/* Regular to Pro Card */}
            <div className="glass-panel rounded-xl p-8 flex flex-col border border-outline-variant/10 card-hover transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tertiary/30 to-transparent" />
              <span className="text-label-caps text-tertiary tracking-widest font-bold mb-2">TIER UPGRADE</span>
              <h2 className="text-title-lg font-bold text-on-surface mb-1 flex items-center gap-2">
                Regular
                <span className="material-symbols-outlined text-[20px] text-tertiary">arrow_forward</span>
                Pro
              </h2>
              <div className="flex items-baseline gap-1 mt-4 mb-6">
                <span className="text-5xl font-extrabold text-on-surface">₹500</span>
                <span className="text-body-sm text-on-surface-variant">one-time difference</span>
              </div>
              
              <p className="text-body-sm text-on-surface-variant mb-6 flex-grow">
                Advance into the highest academic tier. Secure personalized career coaching, direct recommendations, and lifetime repository access.
              </p>

              <div className="border-t border-outline-variant/10 pt-6 mb-8">
                <h4 className="text-label-caps text-on-surface font-bold mb-4">WHAT YOU UNLOCK:</h4>
                <ul className="flex flex-col gap-3">
                  {[
                    "Lifetime LMS & recorded sessions access",
                    "Advanced pro-level projects with 1-on-1 mentorship",
                    "Resume review & LinkedIn profile optimization",
                    "Letters of Recommendation (LOR) for top candidates",
                    "Direct reference checks and priority hiring access",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0 mt-0.5">add_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={CONFIG.upgradeGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-outline-variant/30 text-on-surface text-label-caps py-4 rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] text-center font-bold tracking-widest block"
              >
                UPGRADE TO PRO
              </a>
            </div>

          </div>

          {/* Verification info */}
          <div className="text-center mt-12 max-w-md mx-auto">
            <p className="text-[12px] text-on-surface-variant/70 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
              Upgrades require manual verification of your previous program purchase. Credentials will be updated within 24 hours of form submission.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
