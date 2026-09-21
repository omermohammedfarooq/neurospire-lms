import { courseWeeks, WeekData, ModuleData, COURSE_DATA_VERSION } from "@/data/courseData";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  tierAccess: string; // 'All' | 'Lite' | 'Regular' | 'Pro'
  createdAt: string;
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentEmail: string;
  moduleId: string;
  moduleTitle: string;
  submissionText: string;
  createdAt: string;
}

// Helper to check if client-side execution is available
const isClient = typeof window !== "undefined";

// 1. Initial Seeding of Database
export function initializeLMSDatabase() {
  if (!isClient) return;

  // Seed Weeks if empty
  const savedWeeks = localStorage.getItem("neurospire_db_weeks");
  if (!savedWeeks) {
    // Map initial weeks structure (omitting module definitions so they stay in modules list)
    const seedWeeks = courseWeeks.map(w => ({
      id: w.id,
      weekNumber: w.weekNumber,
      title: w.title,
      subtitle: w.subtitle,
      description: w.description
    }));
    localStorage.setItem("neurospire_db_weeks", JSON.stringify(seedWeeks));
  }

  // ─── Version-based cache invalidation ───────────────────────────────────────
  // If the stored version doesn't match the current COURSE_DATA_VERSION,
  // wipe and re-seed modules so ALL users get fresh content automatically.
  const storedVersion = localStorage.getItem("neurospire_db_version");
  if (storedVersion !== COURSE_DATA_VERSION) {
    const seedModules: Array<ModuleData & { weekId: string }> = [];
    courseWeeks.forEach(week => {
      week.modules.forEach(mod => {
        seedModules.push({ ...mod, weekId: week.id });
      });
    });
    localStorage.setItem("neurospire_db_modules", JSON.stringify(seedModules));
    localStorage.setItem("neurospire_db_version", COURSE_DATA_VERSION);
    console.info(`[LMS] Course data updated to version ${COURSE_DATA_VERSION}`);
  }

  // Seed Announcements if empty
  const savedAnnouncements = localStorage.getItem("neurospire_db_announcements");
  if (!savedAnnouncements) {
    const seedAnnouncements: Announcement[] = [
      {
        id: "ann-1",
        title: "Welcome to AI Engineering Cohort 2026!",
        content: "Welcome technical leaders! We have officially provisioned your sandbox environment. Work through Week 1: AI + Developer Foundations modules and commit your prompting telemetry tools to GitHub.",
        tierAccess: "All",
        createdAt: new Date(Date.now() - 86400000 * 2).toLocaleString()
      },
      {
        id: "ann-2",
        title: "Advanced Pro-Tier Mentorship Session",
        content: "Special reminder for Pro access students: Our first one-on-one architecture audit is scheduled this Thursday at 19:00 IST. Please submit your GitHub repository inside the assignment portal beforehand.",
        tierAccess: "Pro",
        createdAt: new Date(Date.now() - 86400000).toLocaleString()
      }
    ];
    localStorage.setItem("neurospire_db_announcements", JSON.stringify(seedAnnouncements));
  }

  // Seed Submissions if empty
  const savedSubmissions = localStorage.getItem("neurospire_db_submissions");
  if (!savedSubmissions) {
    const seedSubmissions: StudentSubmission[] = [
      {
        id: "sub-1",
        studentName: "Amit Sharma",
        studentEmail: "amit.sharma@example.com",
        moduleId: "w1-m1",
        moduleTitle: "ChatGPT & Prompt Engineering",
        submissionText: "https://github.com/amitsharma/ai-system-prompts - Here is my prompt builder template enforcing deterministic JSON output schema.",
        createdAt: new Date(Date.now() - 86400000).toLocaleString()
      }
    ];
    localStorage.setItem("neurospire_db_submissions", JSON.stringify(seedSubmissions));
  }
}

// 2. Weeks API Operations
export function getWeeks(): WeekData[] {
  if (!isClient) return courseWeeks;
  initializeLMSDatabase();

  const weeksStr = localStorage.getItem("neurospire_db_weeks");
  const modulesStr = localStorage.getItem("neurospire_db_modules");

  if (!weeksStr) return courseWeeks;

  try {
    const weeksList = JSON.parse(weeksStr);
    const modulesList: Array<ModuleData & { weekId: string }> = modulesStr ? JSON.parse(modulesStr) : [];

    // Map modules back into their parent weeks hierarchically
    return weeksList
      .map((w: any) => {
        const weekModules = modulesList.filter((m) => m.weekId === w.id);
        return {
          ...w,
          modules: weekModules
        };
      })
      .sort((a: any, b: any) => a.weekNumber - b.weekNumber);
  } catch (e) {
    console.error("Failed to parse weeks database", e);
    return courseWeeks;
  }
}

export function saveWeek(week: { id: string; weekNumber: number; title: string; subtitle: string; description: string }) {
  if (!isClient) return;
  const weeks = getWeeks().map(w => ({
    id: w.id,
    weekNumber: w.weekNumber,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description
  }));

  const existingIndex = weeks.findIndex((w) => w.id === week.id);
  if (existingIndex > -1) {
    weeks[existingIndex] = week;
  } else {
    weeks.push(week);
  }

  localStorage.setItem("neurospire_db_weeks", JSON.stringify(weeks));
}

export function deleteWeek(weekId: string) {
  if (!isClient) return;
  const weeksStr = localStorage.getItem("neurospire_db_weeks");
  if (!weeksStr) return;

  try {
    const weeks = JSON.parse(weeksStr).filter((w: any) => w.id !== weekId);
    localStorage.setItem("neurospire_db_weeks", JSON.stringify(weeks));

    // Cascade delete modules associated with this week
    const modulesStr = localStorage.getItem("neurospire_db_modules");
    if (modulesStr) {
      const modules = JSON.parse(modulesStr).filter((m: any) => m.weekId !== weekId);
      localStorage.setItem("neurospire_db_modules", JSON.stringify(modules));
    }
  } catch (e) {
    console.error(e);
  }
}

// 3. Modules API Operations
export function getModules(): Array<ModuleData & { weekId: string }> {
  if (!isClient) return [];
  const modulesStr = localStorage.getItem("neurospire_db_modules");
  if (!modulesStr) return [];
  try {
    return JSON.parse(modulesStr);
  } catch (e) {
    return [];
  }
}

export function saveModule(module: ModuleData & { weekId: string }) {
  if (!isClient) return;
  const modules = getModules();
  const existingIndex = modules.findIndex((m) => m.id === module.id);
  if (existingIndex > -1) {
    modules[existingIndex] = module;
  } else {
    modules.push(module);
  }
  localStorage.setItem("neurospire_db_modules", JSON.stringify(modules));
}

export function deleteModule(moduleId: string) {
  if (!isClient) return;
  const modules = getModules().filter((m) => m.id !== moduleId);
  localStorage.setItem("neurospire_db_modules", JSON.stringify(modules));
}

// 4. Announcements Operations
export function getAnnouncements(): Announcement[] {
  if (!isClient) return [];
  initializeLMSDatabase();
  const annStr = localStorage.getItem("neurospire_db_announcements");
  if (!annStr) return [];
  try {
    return JSON.parse(annStr).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    return [];
  }
}

export function addAnnouncement(title: string, content: string, tierAccess: string) {
  if (!isClient) return;
  const announcements = getAnnouncements();
  const newAnn: Announcement = {
    id: `ann-${Math.floor(1000 + Math.random() * 9000)}`,
    title,
    content,
    tierAccess,
    createdAt: new Date().toLocaleString()
  };
  const updated = [newAnn, ...announcements];
  localStorage.setItem("neurospire_db_announcements", JSON.stringify(updated));
}

export function deleteAnnouncement(id: string) {
  if (!isClient) return;
  const updated = getAnnouncements().filter((a) => a.id !== id);
  localStorage.setItem("neurospire_db_announcements", JSON.stringify(updated));
}

// 5. Assignment Submissions Operations
export function getSubmissions(): StudentSubmission[] {
  if (!isClient) return [];
  initializeLMSDatabase();
  const subStr = localStorage.getItem("neurospire_db_submissions");
  if (!subStr) return [];
  try {
    return JSON.parse(subStr).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    return [];
  }
}

export function submitAssignment(submission: {
  studentName: string;
  studentEmail: string;
  moduleId: string;
  moduleTitle: string;
  submissionText: string;
}) {
  if (!isClient) return;
  const submissions = getSubmissions();
  const newSub: StudentSubmission = {
    id: `sub-${Math.floor(10000 + Math.random() * 90000)}`,
    ...submission,
    createdAt: new Date().toLocaleString()
  };
  const updated = [newSub, ...submissions];
  localStorage.setItem("neurospire_db_submissions", JSON.stringify(updated));
}

export function clearSubmission(id: string) {
  if (!isClient) return;
  const updated = getSubmissions().filter((s) => s.id !== id);
  localStorage.setItem("neurospire_db_submissions", JSON.stringify(updated));
}

// 6. Student Progress Operations
export function getCompletedLessons(studentEmail: string): string[] {
  if (!isClient) return [];
  const saved = localStorage.getItem(`neurospire_completed_lessons_${studentEmail}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  // New user — no completed lessons yet, start fresh at zero
  return [];
}

export function saveCompletedLessons(studentEmail: string, completedList: string[]) {
  if (!isClient) return;
  localStorage.setItem(`neurospire_completed_lessons_${studentEmail}`, JSON.stringify(completedList));
}
