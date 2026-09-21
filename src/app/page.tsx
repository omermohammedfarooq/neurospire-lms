import TopAppBar from "@/components/layout/TopAppBar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CONFIG } from "@/config";
import NeuralNetworkCanvas from "@/components/ui/NeuralNetworkCanvas";
import ScrollReveal from "@/components/ui/ScrollReveal";

type SessionType = "virtual" | "project" | "final";

interface CurriculumDay {
  day: string;
  session: string;
  sessionType: SessionType;
  topic: string;
}

interface CurriculumWeek {
  week: string;
  weekColor: string;
  weekBg: string;
  rowSpan: number;
  days: CurriculumDay[];
}

const CURRICULUM_DATA: CurriculumWeek[] = [
  { week: "Week 1", weekColor: "text-primary", weekBg: "bg-primary/5", rowSpan: 3, days: [
    { day: "Day 1", session: "Virtual Session", sessionType: "virtual", topic: "ChatGPT & Prompt Engineering" },
    { day: "Day 2", session: "Virtual Session", sessionType: "virtual", topic: "Cursor AI, VS Code & GitHub Basics" },
    { day: "Day 3", session: "Mini Project Day", sessionType: "project", topic: "AI Landing Page / Portfolio Website" },
  ]},
  { week: "Week 2", weekColor: "text-violet-400", weekBg: "bg-violet-500/5", rowSpan: 3, days: [
    { day: "Day 1", session: "Virtual Session", sessionType: "virtual", topic: "HTML, CSS, Tailwind CSS & JavaScript Basics" },
    { day: "Day 2", session: "Virtual Session", sessionType: "virtual", topic: "React Basics, Components & Responsive Design" },
    { day: "Day 3", session: "Mini Project Day", sessionType: "project", topic: "Startup Landing Page / Dashboard UI Clone" },
  ]},
  { week: "Week 3", weekColor: "text-emerald-400", weekBg: "bg-emerald-500/5", rowSpan: 3, days: [
    { day: "Day 1", session: "Virtual Session", sessionType: "virtual", topic: "APIs, Supabase & Authentication Basics" },
    { day: "Day 2", session: "Virtual Session", sessionType: "virtual", topic: "Databases, Forms & AI API Integration" },
    { day: "Day 3", session: "Mini Project Day", sessionType: "project", topic: "AI Chatbot / Student Dashboard System" },
  ]},
  { week: "Week 4", weekColor: "text-amber-400", weekBg: "bg-amber-500/5", rowSpan: 3, days: [
    { day: "Day 1", session: "Virtual Session", sessionType: "virtual", topic: "GitHub Collaboration & Team Workflow" },
    { day: "Day 2", session: "Virtual Session", sessionType: "virtual", topic: "Deployment, Resume & LinkedIn Optimization" },
    { day: "Day 3", session: "Final Submission Day", sessionType: "final", topic: "Final Project Evaluation & Certification Review" },
  ]},
];

const SESSION_STYLE: Record<SessionType, string> = {
  virtual: "bg-primary/10 text-primary border border-primary/20",
  project: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  final:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export default function HomePage() {
  return (
    <>
      <TopAppBar />
      <main className="pt-[72px]">
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-8 py-16 grid-overlay">
          {/* Background gradient effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]" />
            <NeuralNetworkCanvas />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 animate-fade-in-up">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface/50 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-label-caps text-on-surface-variant">
                Enterprise AI Infrastructure
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-display-lg md:text-[64px] md:leading-[72px] max-w-3xl font-serif tracking-tight">
              <span className="text-on-surface">Think fast,</span>
              <br />
              <span className="text-primary italic font-normal">build faster.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Neurospire AI Technologies is an MSME registered organization dedicated to advanced computer programs, 
              software engineering, machine learning, and artificial intelligence solutions. We aim to educate technical leaders, 
              build state-of-the-art software systems, and deploy robust AI architectures for modern industry demands.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href={CONFIG.registrationGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary text-label-caps px-8 py-3.5 rounded-lg hover:bg-primary-fixed-dim transition-all active:scale-95 flex items-center gap-2 justify-center animate-glow-pulse"
              >
                Enroll Now
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
              <Link
                href="#curriculum"
                className="border border-outline-variant/30 text-on-surface text-label-caps px-8 py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-95 flex items-center gap-2 justify-center glass-panel"
              >
                View Curriculum
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-4 text-on-surface-variant">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-on-surface">480+</span>
                <span className="text-[11px] text-label-caps">R&D Hours</span>
              </div>
              <div className="w-px h-8 bg-outline-variant/30" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-on-surface">500+</span>
                <span className="text-[11px] text-label-caps">Students</span>
              </div>
              <div className="w-px h-8 bg-outline-variant/30" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-on-surface">50+</span>
                <span className="text-[11px] text-label-caps">Projects</span>
              </div>
            </div>

            {/* MSME Trust Callout */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mt-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md text-emerald-400 text-[10px] uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <span className="material-symbols-outlined text-[16px] text-emerald-400 animate-pulse">verified</span>
              Govt. MSME Registered Organization
            </div>
          </div>
        </section>

        {/* ===== CURRICULUM SECTION ===== */}
        <section
          id="curriculum"
          className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/10"
        >
          <div className="max-w-[1100px] mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
                <span className="text-[10px] text-primary uppercase font-bold tracking-widest">5-Week Program</span>
              </div>
              <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface mb-3 font-serif tracking-tight">
                Full <span className="text-primary italic font-normal">Curriculum.</span>
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
                A structured week-by-week breakdown of every session, topic, and deliverable.
              </p>
            </ScrollReveal>

            <div className="overflow-x-auto rounded-2xl border border-outline-variant/15 shadow-2xl">
              <table className="min-w-[800px] w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/20">
                    <th className="px-6 py-4 text-[10px] font-extrabold text-primary uppercase tracking-widest font-mono w-[110px] whitespace-nowrap">Week</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest font-mono w-[90px] whitespace-nowrap">Day</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest font-mono w-[180px] whitespace-nowrap">Session</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest font-mono">Topic</th>
                  </tr>
                </thead>
                <tbody>
                  {CURRICULUM_DATA.flatMap((weekData) =>
                    weekData.days.map((row, rowIdx) => (
                      <tr
                        key={`${weekData.week}-${row.day}`}
                        className={`border-b border-outline-variant/10 transition-colors hover:bg-surface-container/40 ${
                          rowIdx === weekData.days.length - 1 ? "border-b-2 border-outline-variant/20" : ""
                        }`}
                      >
                        {rowIdx === 0 && (
                          <td
                            rowSpan={weekData.rowSpan}
                            className={`px-6 py-4 font-extrabold text-body-sm font-display border-r border-outline-variant/10 ${weekData.weekColor} ${weekData.weekBg} align-middle whitespace-nowrap`}
                          >
                            {weekData.week}
                          </td>
                        )}
                        <td className="px-6 py-3.5 text-body-sm text-on-surface-variant font-mono font-medium whitespace-nowrap">{row.day}</td>
                        <td className="px-6 py-3.5 whitespace-nowrap">
                          <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full font-mono tracking-wider whitespace-nowrap ${SESSION_STYLE[row.sessionType]}`}>
                            {row.session}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-body-sm text-on-surface font-medium">{row.topic}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-center text-[11px] text-on-surface-variant mt-5 font-mono">
              * All 4 weeks of hands-on project work are included with your enrollment.
            </p>
          </div>
        </section>

        {/* ===== AI SOLUTIONS BENTO GRID ===== */}
        <section
          className="py-16 px-4 md:px-12 max-w-[1440px] mx-auto"
          id="solutions"
        >
          <ScrollReveal className="mb-12 text-center">
            <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface mb-3 font-serif tracking-tight">
              Core Technological <span className="text-primary italic font-normal">Focus.</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Mastering the pillars of modern artificial intelligence.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
            {/* Large Feature — LLMs */}
            <div className="md:col-span-2 glass-panel p-6 rounded-xl flex flex-col justify-between h-[360px] md:h-[400px] relative overflow-hidden group card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-surface-container border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary">
                    memory
                  </span>
                </div>
                <h3 className="text-title-md text-on-surface">
                  Large Language Models (LLMs)
                </h3>
                <p className="text-body-sm text-on-surface-variant max-w-md">
                  Design, fine-tune, and deploy transformer-based architectures
                  for complex natural language understanding and generation tasks
                  at scale.
                </p>
              </div>
              <div className="relative z-10 text-mono-code text-on-surface-variant/50 flex flex-col gap-1 mt-auto">
                <span>&gt; init_model(type=&apos;transformer&apos;, params=70B)</span>
                <span>&gt; optimizing_attention_heads... [OK]</span>
                <span className="text-primary">&gt; deployment_ready</span>
              </div>
            </div>

            {/* Computer Vision */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-3 h-[360px] md:h-[400px] card-hover">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary">
                  visibility
                </span>
              </div>
              <h3 className="text-title-md text-on-surface">Computer Vision</h3>
              <p className="text-body-sm text-on-surface-variant">
                Develop robust segmentation and object detection models for
                real-time video stream analysis and spatial mapping.
              </p>
              <div className="mt-auto h-28 w-full rounded-lg border border-outline-variant/20 bg-surface-container-low relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-full h-px bg-primary absolute" />
                  <div className="h-full w-px bg-primary absolute" />
                </div>
                <span className="text-label-caps text-on-surface-variant absolute bottom-2 right-2 text-[10px]">
                  DETECTION_ACTIVE
                </span>
              </div>
            </div>

            {/* Edge AI */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-3 h-[280px] md:h-[300px] card-hover">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary">
                  router
                </span>
              </div>
              <h3 className="text-title-md text-on-surface">
                Edge AI Integration
              </h3>
              <p className="text-body-sm text-on-surface-variant">
                Optimize model inference for resource-constrained edge devices,
                minimizing latency without sacrificing accuracy.
              </p>
            </div>

            {/* Data Engineering */}
            <div className="md:col-span-2 glass-panel p-6 rounded-xl flex flex-col gap-3 h-[280px] md:h-[300px] relative overflow-hidden card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low/50 to-transparent" />
              <div className="relative z-10 w-12 h-12 rounded-lg flex items-center justify-center bg-surface-container border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary">
                  database
                </span>
              </div>
              <h3 className="relative z-10 text-title-md text-on-surface">
                Data Engineering Pipelines
              </h3>
              <p className="relative z-10 text-body-sm text-on-surface-variant max-w-lg">
                Build scalable, fault-tolerant data ingestion and processing
                pipelines essential for continuous model training and validation.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COURSE PLANS ===== */}
        <section
          className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/10"
          id="pricing"
        >
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface mb-3 font-serif tracking-tight">
                Course <span className="text-primary italic font-normal">Plans.</span>
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                Structured learning tiers built for real-world AI mastery.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
              {/* Lite Tier */}
              <div className="glass-panel rounded-xl p-6 flex flex-col border border-outline-variant/10 card-hover">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label-caps text-on-surface-variant">Lite</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                  <span className="text-3xl font-bold text-on-surface">₹349</span>
                  <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹599</span>
                  <span className="text-body-sm text-on-surface-variant">/program</span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-6">
                  Perfect for exploring AI fundamentals and getting started with our community.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    "Weekly live sessions",
                    "Temporary LMS access",
                    "Notes & resources",
                    "Community access",
                    "Participation certificate",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-body-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CONFIG.registrationGoogleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-outline-variant/30 text-on-surface text-label-caps px-5 py-2.5 rounded-lg hover:bg-surface-container transition-all active:scale-95 text-center glass-panel"
                >
                  Get Started
                </a>
              </div>

              {/* Regular Tier — POPULAR */}
              <div className="glass-panel rounded-xl p-6 flex flex-col border-2 border-primary/40 relative card-hover animate-glow-pulse">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label-caps text-primary">Regular</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                  <span className="text-3xl font-bold text-on-surface">₹749</span>
                  <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹1249</span>
                  <span className="text-body-sm text-on-surface-variant">/program</span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-6">
                  Full course experience with real project work and structured mentorship.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    "Everything in Lite",
                    "Course completion certificate",
                    "Real project work",
                    "Recorded sessions",
                    "More assignments",
                    "Better mentor support",
                    "Structured workflow",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-body-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CONFIG.registrationGoogleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary text-label-caps px-5 py-2.5 rounded-lg hover:bg-primary-fixed-dim transition-all active:scale-95 text-center"
                >
                  Apply Now
                </a>
              </div>

              {/* Pro Tier */}
              <div className="glass-panel rounded-xl p-6 flex flex-col border border-outline-variant/10 card-hover">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label-caps text-tertiary">Pro</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3 mb-4 flex-wrap">
                  <span className="text-3xl font-bold text-on-surface">₹1249</span>
                  <span className="text-body-sm text-on-surface-variant line-through opacity-60">₹1599</span>
                  <span className="text-body-sm text-on-surface-variant">/program</span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-6">
                  Premium tier with lifetime access, 1-on-1 mentorship, and career services.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
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
                    <li
                      key={item}
                      className="flex items-center gap-2 text-body-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={CONFIG.registrationGoogleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-outline-variant/30 text-on-surface text-label-caps px-5 py-2.5 rounded-lg hover:bg-surface-container transition-all active:scale-95 text-center glass-panel"
                >
                  Go Premium
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WORKFLOW TIMELINE ===== */}
        <section
          className="py-16 px-4 md:px-12 bg-surface-container-low border-b border-outline-variant/10"
          id="workflow"
        >
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface mb-3 font-serif tracking-tight">
                Real Project <span className="text-primary italic font-normal">Workflow.</span>
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                A structured path from theory to enterprise deployment.
              </p>
            </ScrollReveal>

            <div className="relative border-l-2 border-outline-variant/30 ml-4 md:ml-8 pl-8 md:pl-10 py-4 flex flex-col gap-12 stagger-children">
              {[
                {
                  phase: "01",
                  title: "Rigorous Application",
                  desc: "Initial technical screening focusing on foundational algorithms, mathematics, and systems design capabilities.",
                  active: true,
                },
                {
                  phase: "02",
                  title: "Intensive Training",
                  desc: "Deep-dive modules into state-of-the-art architectures, taught by industry practitioners using production-grade environments.",
                  active: false,
                },
                {
                  phase: "03",
                  title: "Project Assignment",
                  desc: "Integration into a cross-functional team tasked with solving a specific, high-impact problem using cutting-edge AI technologies.",
                  active: false,
                },
                {
                  phase: "04",
                  title: "Model Deployment",
                  desc: "Transitioning models from sandbox environments to active production pipelines, monitoring telemetry and drift.",
                  active: false,
                },
                {
                  phase: "05",
                  title: "Enterprise Certification",
                  desc: "Final review and awarding of credentials recognized by top-tier tech firms and specialized AI research labs.",
                  active: false,
                },
              ].map((step) => (
                <div key={step.phase} className="relative">
                  <div
                    className={`absolute -left-[45px] md:-left-[49px] top-0 w-6 h-6 rounded-full bg-surface border-2 flex items-center justify-center z-10 ${
                      step.active
                        ? "border-primary"
                        : "border-outline-variant"
                    }`}
                  >
                    {step.active && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span
                    className={`text-label-caps mb-1 block ${
                      step.active ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    Phase {step.phase}
                  </span>
                  <h3 className="text-title-md text-on-surface mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant max-w-xl">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ACCESS PORTALS SECTION ===== */}
        <section className="py-16 px-4 md:px-12 max-w-[1280px] mx-auto text-center border-t border-outline-variant/10" id="portals">
          <ScrollReveal className="mb-10">
            <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface mb-3 font-serif tracking-tight">
              System Access <span className="text-primary italic font-normal">Portals.</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Secure authentication pathways for students and educators.
            </p>
          </ScrollReveal>

          <div className="flex justify-center stagger-children">
            {/* Student Card */}
            <div className="glass-panel p-8 rounded-xl border border-primary/20 bg-primary/5 flex flex-col justify-between items-start text-left relative overflow-hidden group card-hover shadow-xl max-w-lg w-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">school</span>
                </div>
                <h3 className="text-title-lg font-bold text-on-surface font-display">Student Portal</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Access your personalized LMS curriculum, track progress across weekly modules, submit technical project repositories, and claim verified course certificates.
                </p>
              </div>
              <Link
                href="/login"
                className="mt-8 bg-primary text-on-primary text-label-caps px-6 py-3 rounded-lg hover:bg-primary-fixed-dim transition-all active:scale-95 flex items-center gap-2 font-bold tracking-widest"
              >
                Access Student Portal
                <span className="material-symbols-outlined text-[18px]">login</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-20 px-4 md:px-12 grid-overlay-subtle border-t border-outline-variant/10">
          <ScrollReveal className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-display-md md:text-[48px] md:leading-[56px] text-on-surface font-serif tracking-tight">
              Ready to Build the <span className="text-primary italic font-normal">Future of AI?</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Join Neurospire AI Technologies and learn real-world skills with
              industry-grade tools and expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href={CONFIG.registrationGoogleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary text-label-caps px-8 py-3.5 rounded-lg hover:bg-primary-fixed-dim transition-all active:scale-95 flex items-center gap-2 justify-center"
              >
                Enroll Now
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
              <Link
                href="/login"
                className="border border-outline-variant/30 text-on-surface text-label-caps px-6 py-3.5 rounded-lg hover:bg-surface-container transition-all active:scale-95 text-center glass-panel"
              >
                Student Portal
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
