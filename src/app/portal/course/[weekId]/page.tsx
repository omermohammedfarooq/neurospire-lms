"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Footer from "@/components/layout/Footer";
import {
  getWeeks,
  getCompletedLessons,
  saveCompletedLessons,
  submitAssignment
} from "@/services/lmsService";
import { WeekData, ModuleData, COURSE_TITLE } from "@/data/courseData";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface StudentSession {
  name: string;
  email: string;
  tier: "Lite" | "Regular" | "Pro";
  track: string;
}

export default function CourseWeekSpacePage({ params }: { params: Promise<{ weekId: string }> }) {
  const router = useRouter();
  const { weekId } = use(params);

  const [student, setStudent] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Active dynamic states
  const [week, setWeek] = useState<WeekData | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleData | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Interactive assignment states
  const [submissionText, setSubmissionText] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    // Validate session
    const sessionStr = sessionStorage.getItem("neurospire_student_session");
    if (!sessionStr) {
      router.push("/login");
      return;
    }

    try {
      const activeStudent = JSON.parse(sessionStr);
      setStudent(activeStudent);

      // Load active week dynamically from LMS Database Service
      const dbWeeks = getWeeks();
      const activeWeek = dbWeeks.find((w) => w.id === weekId);
      if (!activeWeek) {
        router.push("/portal");
        return;
      }
      setWeek(activeWeek);
      
      // Default to first module or retrieve last viewed if any
      setActiveModule(activeWeek.modules[0]);

      // Load completed lessons from Database Service
      const completed = getCompletedLessons(activeStudent.email);
      setCompletedLessons(completed);
    } catch (e) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router, weekId]);

  if (loading || !student || !week || !activeModule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <BrandLogo size={48} className="animate-spin" />
          <span className="text-body-sm text-outline animate-pulse font-display">Configuring secure learning sandbox...</span>
        </div>
      </div>
    );
  }

  // Handle marking active module as complete
  const handleMarkComplete = () => {
    if (!completedLessons.includes(activeModule.id)) {
      const updated = [...completedLessons, activeModule.id];
      setCompletedLessons(updated);
      saveCompletedLessons(student.email, updated);
    }

    // Auto-advance to next module if available in this week
    const currentIndex = week.modules.findIndex((m) => m.id === activeModule.id);
    if (currentIndex < week.modules.length - 1) {
      setActiveModule(week.modules[currentIndex + 1]);
      setSubmissionText("");
      setSubmissionSuccess(false);
      
      // Smooth scroll back to top of content panel on mobile
      const contentEl = document.getElementById("learning-content");
      if (contentEl) {
        contentEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setSubmissionSuccess(true);
    }
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    // Save student submission to backend database
    submitAssignment({
      studentName: student.name,
      studentEmail: student.email,
      moduleId: activeModule.id,
      moduleTitle: activeModule.title,
      submissionText: submissionText.trim()
    });

    setSubmissionSuccess(true);
  };

  // Week statistics
  const weekModuleIds = week.modules.map((m) => m.id);
  const completedInWeek = completedLessons.filter((id) => weekModuleIds.includes(id)).length;
  const totalInWeek = week.modules.length;
  const weekProgressPercent = totalInWeek > 0 ? Math.round((completedInWeek / totalInWeek) * 100) : 0;

  // Video parsing logic for unlisted/shared YouTube links
  const isYouTube = activeModule.videoUrl.includes("youtube.com") || activeModule.videoUrl.includes("youtu.be") || activeModule.videoUrl.includes("embed");
  
  const getEmbedUrl = (url: string) => {
    if (url.includes("embed/")) return url;
    try {
      if (url.includes("watch?v=")) {
        const parts = url.split("watch?v=");
        const videoId = parts[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        const videoId = parts[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      console.error("Failed to parse YouTube embed", e);
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col relative overflow-hidden">
      {/* Background ambient grids */}
      <div className="absolute inset-0 z-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[110px] z-0 pointer-events-none" />

      {/* Nav bar */}
      <nav className="relative z-25 glass-nav border-b border-outline-variant/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/portal" className="text-on-surface-variant hover:text-primary transition-all flex items-center gap-1 text-label-caps font-bold">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Dashboard
          </Link>
          <div className="w-px h-6 bg-outline-variant/20 hidden sm:block" />
          <span className="text-[12px] text-outline font-display font-medium max-w-xs truncate hidden sm:block">
            {COURSE_TITLE}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            {student.tier} Space
          </span>
          <ThemeToggle />
          <span className="text-body-sm font-bold text-on-surface font-mono hidden md:inline">
            {student.name}
          </span>
        </div>
      </nav>

      {/* Main interactive application frame */}
      <div className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-stretch min-h-[calc(100vh-70px)]">
        
        {/* SIDEBAR NAVIGATION: Collapsible/Responsive Course Outline (Left Panel) */}
        <aside className="w-full lg:w-[320px] bg-surface-container/90 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-outline-variant/10 p-5 shrink-0 flex flex-col gap-4 animate-fade-in-right">
          <div className="flex flex-col gap-1 pb-3 border-b border-outline-variant/10">
            <span className="text-[9px] text-primary uppercase font-bold tracking-widest font-mono">WEEK {week.weekNumber} MODULES</span>
            <h2 className="text-body-lg font-extrabold text-on-surface tracking-tight truncate">{week.title}</h2>
            
            {/* Week Progress Metric */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-bold font-mono mb-1.5">
                <span>WEEK PROGRESS</span>
                <span>{completedInWeek} / {totalInWeek} DONE ({weekProgressPercent}%)</span>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
                  style={{ width: `${weekProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Module navigation list */}
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto max-h-[140px] lg:max-h-none pb-2 lg:pb-0 pr-1 scrollbar-thin shrink-0 lg:flex-1">
            {week.modules.map((m, idx) => {
              const isActive = activeModule.id === m.id;
              const isCompleted = completedLessons.includes(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveModule(m);
                    setSubmissionText("");
                    setSubmissionSuccess(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200 shrink-0 lg:shrink-0 max-w-[240px] lg:max-w-none ${
                    isActive
                      ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_rgba(68,143,255,0.05)]"
                      : isCompleted
                      ? "bg-surface-container border-emerald-500/10 text-emerald-500 hover:border-emerald-500/25"
                      : "bg-surface-container/30 border-outline-variant/5 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/20"
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                    isActive
                      ? "bg-primary text-on-primary"
                      : isCompleted
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-surface-container-high text-outline"
                  }`}>
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    ) : (
                      idx + 1
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[9px] font-extrabold tracking-widest font-mono ${
                      isActive ? "text-primary/70" : isCompleted ? "text-emerald-500/60" : "text-outline/60"
                    }`}>
                      DAY {idx + 1}
                    </span>
                    <span className="text-body-sm font-bold truncate leading-snug font-display">{m.title}</span>
                    <span className="text-[10px] text-outline font-mono font-medium">{m.duration}</span>
                  </div>
                </button>
              );
            })}

            {week.modules.length === 0 && (
              <p className="text-center py-6 text-body-sm text-outline w-full">No active modules configured.</p>
            )}
          </nav>
        </aside>

        {/* MAIN PANEL: SaaS Active Lesson Area (Right Panel) */}
        <main id="learning-content" className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
          
          {/* Header breadcrumbs */}
          <div className="mb-6 flex flex-col gap-1 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-outline font-bold font-mono">
              <span>CURRICULUM</span>
              <span>/</span>
              <span>WEEK {week.weekNumber}</span>
              <span>/</span>
              <span>DAY {week.modules.findIndex(m => m.id === activeModule.id) + 1}</span>
              <span>/</span>
              <span className="text-primary">{activeModule.title}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-extrabold text-primary tracking-widest font-mono">
                DAY {week.modules.findIndex(m => m.id === activeModule.id) + 1}
              </span>
              <h1 className="text-headline-md md:text-headline-lg font-black text-on-surface tracking-tight font-display">
                {activeModule.title}
              </h1>
            </div>
          </div>

          {/* Grid Layout: Video Left, Sidebar notes/resources Right */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start mb-10 shrink-0">
            
            {/* 1. VIDEO SPACE (8 Columns) - Supports YouTube embeds & standard MP4s dynamically */}
            <div className="xl:col-span-8 flex flex-col gap-4 animate-scale-in">
              <div className="relative aspect-video w-full rounded-2xl border border-outline-variant/15 bg-surface-container-lowest overflow-hidden shadow-2xl group">
                
                {isYouTube ? (
                  <iframe
                    src={getEmbedUrl(activeModule.videoUrl)}
                    title={activeModule.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  />
                ) : (
                  <video
                    src={activeModule.videoUrl}
                    controls
                    poster="/images/neurospire_logo_dark.png"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Top overlay track title */}
                <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-outline-variant/10 text-[10px] font-mono tracking-widest text-white">
                    MODULE STREAM
                  </div>
                  <div className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 text-[10px] font-mono tracking-widest text-primary font-bold">
                    AES SECURE PLAY
                  </div>
                </div>
              </div>

              {/* Progress Completion Indicator */}
              <div className="flex items-center justify-between flex-wrap gap-4 p-4 glass-panel border border-outline-variant/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    completedLessons.includes(activeModule.id) ? "bg-emerald-500" : "bg-amber-400"
                  }`} />
                  <span className="text-body-sm font-bold text-on-surface">
                    Status: {completedLessons.includes(activeModule.id) ? "Module Fully Completed" : "Incomplete — Work through lesson"}
                  </span>
                </div>

                <button
                  onClick={handleMarkComplete}
                  className={`px-6 py-2.5 rounded-lg text-label-caps font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-lg ${
                    completedLessons.includes(activeModule.id)
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/10"
                      : "bg-primary hover:bg-primary-fixed text-on-primary shadow-primary/10"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {completedLessons.includes(activeModule.id) ? "done_all" : "check"}
                  </span>
                  {completedLessons.includes(activeModule.id) ? "MODULE COMPLETED" : "MARK MODULE COMPLETE"}
                </button>
              </div>
            </div>

            {/* 2. NOTES & DOWNLOADS SIDE PANEL (4 Columns) */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              
              {/* Reference/Resources Section */}
              <div className="glass-panel p-5 rounded-2xl border border-outline-variant/10 shadow-xl flex flex-col gap-4">
                <h3 className="text-body-md font-extrabold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">download_for_offline</span>
                  Reference Materials
                </h3>
                <div className="flex flex-col gap-2.5">
                  {activeModule.resources && activeModule.resources.map((res, index) => (
                    <a
                      key={index}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-panel border border-outline-variant/10 rounded-xl hover:border-primary/20 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[22px]">
                          {res.type === "pdf" ? "picture_as_pdf" : res.type === "zip" ? "folder_zip" : "link"}
                        </span>
                        <span className="text-body-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                          {res.name}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[16px] group-hover:translate-y-0.5 transition-transform">
                        arrow_downward
                      </span>
                    </a>
                  ))}

                  {(!activeModule.resources || activeModule.resources.length === 0) && (
                    <p className="text-body-sm text-outline text-center py-4">No additional references attached.</p>
                  )}
                </div>
              </div>

              {/* Lesson Notes Section */}
              <div className="glass-panel p-5 rounded-2xl border border-outline-variant/10 shadow-xl flex flex-col gap-4">
                <h3 className="text-body-md font-extrabold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  Technical Objectives
                </h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {activeModule.notes}
                </p>
                <div className="mt-2 border-t border-outline-variant/10 pt-3 flex flex-col gap-2">
                  <span className="text-[9px] text-outline font-mono font-bold uppercase">Assigned Core Competencies</span>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">Telemetry</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">Software Engineering</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">AI Execution</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ASSIGNMENT / DELIVERABLE SUBMISSION SECTION (Full Width Bento Panel) */}
          <section className="glass-panel p-6 md:p-8 rounded-2xl border border-outline-variant/10 shadow-2xl relative overflow-hidden mb-12 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined">assignment</span>
              </div>
              <div>
                <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest font-mono">MODULE ASSIGNMENT BRIEF</span>
                <h3 className="text-body-lg font-black text-on-surface">{activeModule.assignment.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Instructions */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="p-4 bg-surface-container/30 border border-outline-variant/10 rounded-xl">
                  <span className="text-[10px] text-outline font-bold uppercase font-mono block mb-1">TASK BRIEF</span>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    {activeModule.assignment.description}
                  </p>
                </div>
                <div className="p-4 bg-surface-container/30 border border-outline-variant/10 rounded-xl">
                  <span className="text-[10px] text-outline font-bold uppercase font-mono block mb-1">EXPECTED DELIVERABLE</span>
                  <p className="text-body-sm text-amber-300 leading-relaxed font-semibold">
                    {activeModule.assignment.deliverable}
                  </p>
                </div>
              </div>

              {/* Submission Interactive Area */}
              <div className="lg:col-span-6">
                {submissionSuccess ? (
                  <div className="p-6 bg-success/5 border border-success/20 rounded-xl flex flex-col items-center text-center gap-3 animate-scale-in">
                    <span className="material-symbols-outlined text-[48px] text-success">verified</span>
                    <div>
                      <h4 className="text-body-md font-bold text-success font-display">Assignment Delivered Successfully</h4>
                      <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Your workspace commits and telemetry artifacts have been registered inside the Neurospire Evaluation Engine. Mentors will audit the submission within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmissionSuccess(false)}
                      className="text-body-sm text-primary hover:underline font-bold mt-2"
                    >
                      Update Submission Details
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAssignmentSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold" htmlFor="submit-text">
                        Submission Telemetry URL or Console Log
                      </label>
                      <textarea
                        id="submit-text"
                        required
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Paste your public GitHub repository link or submit clean text description of your project output..."
                        rows={4}
                        className="w-full bg-surface-container-low/60 border border-outline-variant/30 text-on-surface rounded-xl p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/50 text-body-sm leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/30 text-label-caps py-3 rounded-xl font-bold tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">publish</span>
                      SUBMIT TELEMETRY WORKSPACE
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>

        </main>
      </div>
      
      <Footer />
    </div>
  );
}
