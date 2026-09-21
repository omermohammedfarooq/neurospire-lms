"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import Footer from "@/components/layout/Footer";
import {
  getWeeks,
  getCompletedLessons,
  getAnnouncements,
  Announcement
} from "@/services/lmsService";
import { WeekData, COURSE_TITLE, COURSE_SUBTITLE } from "@/data/courseData";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface StudentSession {
  name: string;
  email: string;
  tier: "Lite" | "Regular" | "Pro";
  track: string;
}

export default function StudentPortalDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Dynamic backend states
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

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

      // Load completed lessons dynamically from LMS Database Service
      const completed = getCompletedLessons(activeStudent.email);
      setCompletedLessons(completed);

      // Fetch dynamic syllabus & announcements
      const dbWeeks = getWeeks();
      setWeeks(dbWeeks);

      // Filter announcements dynamically by student access scope
      const dbAnn = getAnnouncements();
      const scopedAnn = dbAnn.filter(
        (a) => a.tierAccess === "All" || a.tierAccess === activeStudent.tier
      );
      setAnnouncements(scopedAnn);
    } catch (e) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("neurospire_student_session");
    router.push("/login");
  };

  if (loading || !student) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <BrandLogo size={48} className="animate-spin" />
          <span className="text-body-sm text-outline animate-pulse">Initializing LMS environment...</span>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats across the dynamic Weeks & Modules
  const totalLessons = weeks.reduce((acc, week) => acc + week.modules.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Helper to calculate module progress per week
  const getWeekProgress = (weekId: string) => {
    const week = weeks.find((w) => w.id === weekId);
    if (!week) return { completed: 0, total: 0, percent: 0 };
    const weekModuleIds = week.modules.map((m) => m.id);
    const completedInWeek = completedLessons.filter((id) => weekModuleIds.includes(id)).length;
    const totalInWeek = week.modules.length;
    const percent = totalInWeek > 0 ? Math.round((completedInWeek / totalInWeek) * 100) : 0;
    return { completed: completedInWeek, total: totalInWeek, percent };
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex flex-col relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute inset-0 z-0 grid-overlay opacity-25 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Nav bar */}
      <nav className="relative z-10 glass-nav border-b border-outline-variant/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo size={36} />
        </Link>

        <div className="flex items-center gap-4">
          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
            student.tier === "Pro"
              ? "bg-tertiary/10 text-tertiary border border-tertiary/20"
              : student.tier === "Regular"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-outline-variant/10 text-outline-variant border border-outline-variant/20"
          }`}>
            {student.tier} Access
          </span>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-label-caps text-on-surface-variant hover:text-error transition-all py-1.5 px-3 rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard container */}
      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card & Info (Left Panel) */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-tertiary to-primary" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xl font-bold font-display select-none shadow-[0_0_15px_rgba(68,143,255,0.15)]">
                {student.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-body-lg font-bold text-on-surface leading-tight">{student.name}</span>
                <span className="text-body-sm text-on-surface-variant font-mono">{student.email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 border-t border-outline-variant/10 pt-4">
              <div>
                <span className="text-[10px] text-outline uppercase tracking-wider block">Assigned Track</span>
                <span className="text-body-sm text-on-surface font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">psychology</span>
                  {student.track}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-outline uppercase tracking-wider block">LMS Status</span>
                <span className="text-body-sm text-success font-semibold flex items-center gap-1.5 mt-0.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  Active Session Verified
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-outline-variant/10 text-center">
              <span className="text-headline-lg font-bold text-primary">{completedCount} / {totalLessons}</span>
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">Modules Completed</p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-outline-variant/10 text-center">
              <span className="text-headline-lg font-bold text-tertiary">{progressPercent}%</span>
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">Total Progress</p>
            </div>
          </div>

          {/* Upgrade Card if Lite or Regular */}
          {student.tier !== "Pro" && (
            <div className="glass-panel p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-label-caps text-primary font-bold">ACCELERATE STUDY</span>
              <h4 className="text-body-md font-bold text-on-surface">Unlock Verified Certification</h4>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Upgrade your course plan to submit production repos, schedule 1-on-1 mentorship, and request Letters of Recommendation.
              </p>
              <Link
                href="/upgrade"
                className="mt-2 text-label-caps text-on-surface hover:text-primary font-bold flex items-center gap-1 transition-colors"
              >
                View Upgrade Pathways
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          )}
        </section>

        {/* Dashboard Content & Curriculums (Right Panel) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Real-time Announcements Board */}
          {announcements.length > 0 && (
            <div className="glass-panel p-5 rounded-xl border border-primary/20 bg-primary/5 shadow-md flex flex-col gap-3 animate-fade-in">
              <div className="flex items-center gap-2 text-primary font-extrabold text-body-sm font-display tracking-widest uppercase">
                <span className="material-symbols-outlined text-[20px] animate-bounce">campaign</span>
                Live Cohort Announcements
              </div>
              <div className="flex flex-col gap-3.5 divide-y divide-outline-variant/10">
                {announcements.map((ann) => (
                  <div key={ann.id} className="pt-3 first:pt-0 flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-body-md font-extrabold text-on-surface">{ann.title}</h4>
                      <span className="text-[8px] font-extrabold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest leading-none">{ann.tierAccess} Scope</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant leading-relaxed mt-1">{ann.content}</p>
                    <span className="text-[9px] text-outline font-mono block mt-1">{ann.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Active Curriculum */}
          <div className="glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-2xl relative">
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-label-caps text-primary tracking-widest text-[10px] font-extrabold uppercase">Active Curriculum</span>
              <h2 className="text-headline-sm md:text-title-lg font-bold text-on-surface font-display leading-tight">
                {COURSE_TITLE}
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mt-0.5">
                {COURSE_SUBTITLE}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {weeks.map((week) => {
                const weekStats = getWeekProgress(week.id);
                return (
                  <div
                    key={week.id}
                    className="glass-panel p-5 rounded-xl border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all group card-hover relative"
                  >
                    <div className="flex-1 flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-primary shrink-0 leading-none">
                        <span className="text-[10px] uppercase font-bold tracking-wider">Wk</span>
                        <span className="text-lg font-black font-display mt-0.5">{week.weekNumber}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors font-display">
                            {week.title}
                          </h3>
                          {weekStats.percent === 100 && weekStats.total > 0 && (
                            <span className="bg-success/10 text-success text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-success/20 uppercase tracking-widest leading-none">
                              Completed
                            </span>
                          )}
                          {weekStats.percent > 0 && weekStats.percent < 100 && (
                            <span className="bg-primary/10 text-primary text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-widest leading-none animate-pulse">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          {week.subtitle}
                        </p>
                        
                        {/* Micro Progress Bar inside the card */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary transition-all duration-500"
                              style={{ width: `${weekStats.percent}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-outline font-mono font-bold shrink-0">
                            {weekStats.completed} / {weekStats.total} Modules ({weekStats.percent}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/portal/course/${week.id}`}
                      className="border border-outline-variant/30 text-on-surface hover:border-primary/50 group-hover:bg-primary group-hover:text-on-primary text-label-caps px-5 py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all text-center self-stretch md:self-auto shadow-md"
                    >
                      <span>Launch space</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                );
              })}

              {weeks.length === 0 && (
                <p className="text-center py-8 text-body-md text-on-surface-variant">No active syllabus weeks configured yet. Provision weeks in the control center.</p>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
